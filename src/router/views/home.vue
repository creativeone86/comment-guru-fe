<script>
    import {mapState, mapActions} from "vuex";

    import Layout from "../layouts/main";
    import {required} from "vuelidate/lib/validators";
    import InfiniteLoading from 'vue-infinite-loading';
    import CommentComponent from './comment.component';

    /**
     * Dashboard-1 Component
     */
    export default {
        components: {Layout, InfiniteLoading, CommentComponent},
        data() {
            return {
                title: "Messages Board",
                myAvatar: require('@/assets/images/users/ninja.png'),
                uknownAvatar: require('@/assets/images/users/uknown.png'),
                postContent: "",
                submitted: false,
                sortOrder: -1,
                page: 0,
                infiniteId: +new Date(),
                isLoading: false
            };
        },
        validations: {
            postContent: {required}
        },
        computed: {
            ...mapState({
                posts: state => state.posts,
                account: state => state.account
            })
        },
        methods: {
            ...mapActions("posts", {
                fetchPosts: "fetchPosts",
                publishPost: "publishPost",
                emptyCollection: "emptyCollection"
            }),
            handlePublish() {
                const shoudCleanCollection = parseInt(this.sortOrder) === 1;
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) return;
                const {postContent} = this;
                if (shoudCleanCollection) this.sortOrder = -1;
                this.publishPost({content: postContent, sortOrder: this.sortOrder}).then(() => {
                    this.submitted = false;
                    if (shoudCleanCollection) {
                        this.page = 0;
                        this.emptyCollection();
                        this.infiniteId += 1;
                    }
                });
                this.postContent = "";

            },
            incrementInfiniteId() {
                this.sortOrder = -1;
                this.page = 0;
                this.emptyCollection();
                this.infiniteId += 1;
            },
            onSortChange() {
                this.emptyCollection();
                this.page = 0;
                this.infiniteId += 1;
            },
            infiniteHandler($state) {
                if (!this.isLoading) {
                    this.fetchPosts({order: this.sortOrder, page: this.page})
                        .then((data) => {
                            if (data.constructor === Array && data.length > 0) {
                                this.page += 1;
                                $state.loaded();
                            } else {
                                $state.complete();
                            }
                            this.isLoading = false;
                        })
                        .catch(() => this.isLoading = false);
                }
            }
        }
    };
</script>

<template>
    <Layout>
        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-flex align-items-center justify-content-between">
                    <h4 class="mb-0 font-size-18">Story Board</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item active">Welcome to Message Guru, <strong>{{account.user.username}}</strong>!
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <!-- end page title -->
        <div class="row mb-50">
            <div class="col-lg-12">
                <div class="card border border-primary">
                    <div class="card-header clearfix">
                        <div class="float-left">
                            <img class="rounded-circle avatar-md" :src="`${myAvatar}`" alt/>
                        </div>
                        <div class="ml-90 clearfix">
                            <comment-component
                                    :type="'post'"
                                    :sortOrder="sortOrder"
                                    :buttonText="'Publish'"
                                    :place-holder="'What do you have in mind?'"
                                    @incrementInfititeId="incrementInfiniteId"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end of post input -->
        <div class="page-title-box">
            <div class="form-group row">
                <label class="col-md-2 col-form-label">Order story posts by</label>
                <div class="col-md-10">
                    <select class="form-control" @change="onSortChange()" v-model="sortOrder">
                        <option value="-1">Newest</option>
                        <option value="1">Oldest</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row mb-50" v-for="post in posts.collection" :key="post._id">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header clearfix">
                        <div class="float-left">
                            <img class="rounded-circle avatar-sm"
                                 :src="`${post.author.username === account.user.username ? myAvatar : uknownAvatar}`"
                                 alt/>
                        </div>
                        <div class="ml-65 clearfix">
                            <h5 class="text-primary">
                                {{post.author.username}}
                            </h5>
                            <p><i class="bx bx-time clock-aligned"></i>
                                <timeago :datetime="new Date(post.created)"></timeago>
                            </p>
                        </div>

                    </div>
                    <div class="card-body">
                        <h3 class="font-italic text-white">{{post.content}}</h3>
                    </div>
                    <div class="card-footer">
                        <comment-component
                                :type="'comment'"
                                :postId="post.postId"
                                :comments="post.comments"
                                :buttonText="'Comment'"
                                :place-holder="'Comment here...'"/>
                    </div>
                </div>
            </div>
        </div>

        <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
    </Layout>
</template>

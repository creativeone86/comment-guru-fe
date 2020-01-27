<template>
    <div>
    <div v-if="type === 'post'">
        <b-form class="form-horizontal" @submit.prevent="handlePostPublish">
            <div class="bv-no-focus-ring col">
                <b-form-input
                        type="text"
                        class="form-control w-pl"
                        v-model="postContent"
                        for="text"
                        :class="{ 'is-invalid': submitted && $v.postContent.$error }"
                        :placeholder="placeHolder"></b-form-input>
                <b-button type="submit" variant="secondary" class="btn-block mt-15">{{buttonText}}</b-button>
            </div>
        </b-form>
    </div>

    <div v-if="type === 'comment'">
        <hr>
        <h5 v-if="comments.length > 0">Comments</h5>
        <div class="row" v-for="comment in comments" :key="comment.created">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">{{comment.author.username}} - <small><timeago :datetime="new Date(comment.created)"></timeago></small></h4>
                        <p class="card-text">{{comment.content}}</p>
                    </div>
                </div>
            </div>
        </div>
        <b-form class="form-horizontal" @submit.prevent="handleCommentPublish">
            <div class="bv-no-focus-ring col">
                <b-form-input
                        type="text"
                        class="form-control w-pl"
                        v-model="commentContent"
                        for="text"
                        :class="{ 'is-invalid': submitted && $v.commentContent.$error }"
                        :placeholder="placeHolder"></b-form-input>
                <b-button type="submit" variant="secondary" class="btn-block mt-15">{{buttonText}}</b-button>
            </div>
        </b-form>
    </div>
    </div>
</template>

<script>
    import {required} from "vuelidate/lib/validators";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "comment.component",
        props: [
            'type',
            'sortOrder',
            'placeHolder',
            'buttonText',
            'postId',
            'comments'
        ],
        data() {
            return {
                myAvatar: require('@/assets/images/users/ninja.png'),
                postContent: "",
                submitted: false,
                commentContent: ""
            };
        },
        validations: {
            postContent: {required},
            commentContent: {required}
        },
        computed: {
            ...mapState({
                posts: state => state.posts
            })
        },
        methods: {
            ...mapActions("posts", {
                publishPost: "publishPost",
                emptyCollection: "emptyCollection",
                publishComment: "publishComment"
            }),
            handlePostPublish() {
                const shoudCleanCollection = parseInt(this.sortOrder) === 1;
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) return;
                const {postContent} = this;
                this.publishPost({content: postContent, sortOrder: this.sortOrder}).then(() => {
                    this.submitted = false;
                    if (shoudCleanCollection) {
                        this.$emit('incrementInfititeId');
                    }
                });
                this.postContent = "";
            },
            handleCommentPublish() {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) return;
                this.publishComment({postId: this.postId, content: this.commentContent})
                .then((newComment) => {
                    this.comments.push(newComment);
                    this.commentContent = "";
                })
                .catch(() => this.commentContent = "");
            }
        }
    }
</script>


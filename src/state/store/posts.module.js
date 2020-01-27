import {postsService} from "../services";

const state = {
    loading: true,
    collection: [],
    error: null
};

const actions = {
    emptyCollection({ commit }) {
        commit('emptyCollection');
    },
    fetchPosts({ commit }, {order, page}) {
        commit('fetchPosts');
        return postsService.fetchPosts(order, page)
            .then(
                posts => {
                    commit('fetchPostsSuccess', posts);
                    return posts;
                },
                error => {
                    commit('fetchPostsFailure', error);
                    return error;
                }
            );
    },
    publishPost({ commit }, {content, order}) {
        return postsService.publishPost(content)
            .then(
                () => {
                    if (order === 1) commit('publishPostSuccess', null);
                    postsService.fetchPosts(-1, 0, 1)
                        .then(
                            (newPost) => {
                                commit('publishPostSuccess', newPost);
                                return newPost;
                             },
                            (error) => {
                                commit('errorAddNewPost', error);
                                return error;
                            }
                        );
                },
                error => commit('errorAddNewPost', error)
            );

    },
    publishComment({ commit }, {postId, content}) {
        return postsService.publishComment(postId, content)
            .then(
                (newComment) => {
                    commit('publishCommentSuccess', newComment);
                    return newComment;
                },
                (error) => {
                    commit('errorNewComment', error);
                    return error;
                }
            );
    }
};

const mutations = {
    emptyCollection(state) {
        return state.collection = [];
    },
    fetchPosts(state) {
        return state;
    },
    fetchPostsSuccess(state, posts) {
        state.collection = state.collection.concat(posts);
        state.error = null;
        return state;
    },
    fetchPostsFailure(state, error) {
        state.error = error;
        return state;
    },
    publishPostSuccess(state, newPost) {
        if (newPost === null) return state;
        if (newPost.length === 1) {
            let clonedCollection = JSON.parse(JSON.stringify(state.collection));
            clonedCollection.unshift(newPost[0]);
            state.collection = clonedCollection;
        }
        return state;
    },
    publishPost(state) {
        return state;
    },
    errorAddNewPost(state, error) {
        state.error = error;
        return state;
    },
    publishCommentSuccess(state) {
        return state;
    },
    errorNewComment(state, error) {
        state.error = error;
        return state;
    }
};

export const posts = {
    namespaced: true,
    state,
    actions,
    mutations
};

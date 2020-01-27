import { authHeader, authPostHeader } from '../helpers/auth-header.js';
import { handleResponse } from '../helpers/service.helper';
import axios from 'axios';
import qs from 'qs';

export const postsService = {
    fetchPosts,
    publishPost,
    publishComment
};

function fetchPosts(sort, page, limit) {
    limit = limit || 10;
    return axios.get(`/posts?sort=${sort}&page=${page}&limit=${limit}`, authHeader())
        .then(handleResponse);
}

function publishPost(content, sort) {
    return axios.post('/posts', qs.stringify({content, sort}), authPostHeader())
        .then(handleResponse);
}

function publishComment(postId, content) {
    return axios.post('/comments', qs.stringify({postId, content}), authPostHeader())
        .then(handleResponse);
}


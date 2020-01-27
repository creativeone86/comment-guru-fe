import { authHeader } from '../helpers/auth-header.js';
import { logout, handleResponse } from '../helpers/service.helper.js';
import axios from 'axios';

export const userService = {
    login,
    logout
};

function login(username, password) {
    return axios.post('/auth/login', {username, password}, authHeader)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}


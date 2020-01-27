export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.access_token) {
        return {headers: {'Authorization': 'Bearer ' + user.access_token}};
    } else {
        return {};
    }
}

export function authPostHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.access_token) {
        return {
            headers: {
                'Authorization': 'Bearer ' + user.access_token,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        };
    } else {
        return {};
    }
}

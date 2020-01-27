export const logout = function() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
};

export const handleResponse = function(response) {
    const data = response.data || {};
    const status = response.status || 500;
    if (status > 299) {
        if (status === 401) {
            logout();
            location.reload(true);
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
};





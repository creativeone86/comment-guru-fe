// set global config for all api interactions
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export * from './user.service';
export * from './posts.service';

import axios from 'axios';
const API_URL = 'http://localhost:88/api/auth/';

class AuthService {
    login(user) {
        return axios
        .post(API_URL + 'login', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            if(response.data.status == 1 && response.data.results.access_token) {
                localStorage.setItem('user', JSON.stringify(response.data.results.access_token));
            }
            return response.data
        });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'register', {
            name: user.name,
            email: user.email,
            password: user.password
        })
        .then(response => {
            if(response.data.status == 1 && response.data.results.token) {
                // localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data
        })
        .catch(error => {
            return JSON.stringify(error);
        })
    }

    me() {
        // let user = localStorage.getItem('user')
        return axios.get(API_URL + 'me', {
            // headers: {
            //     Authorization: 'Bearer ' + JSON.parse(user).access_token //the token is a variable which holds the token
            // }
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(err)
        })
    }
}

export default new AuthService();
import axios from 'axios';
const API_URL = 'http://localhost:88/api/auth/';

class AuthService {
    login(user) {
        return axios
        .post(API_URL + 'login', {
            username: user.username,
            password: user.password
        })
        .then(response => {
            if(response.status == 1 && response.data.access_token) {
                localStorage.setItem('user', JSON.stringify(response.data));
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
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data
        })
        .catch(error => {
            return JSON.stringify(error);
        })
    }
}

export default new AuthService();
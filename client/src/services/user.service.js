import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'http://localhost:88/api/auth/';

class UserService {
    getMe() {
        return axios.get(API_URL + 'me');
    }
}

export default new UserService();
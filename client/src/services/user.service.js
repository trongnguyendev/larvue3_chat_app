import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'http://localhost:88/api/';

class UserService {
    getInforMe() {
        return axios.get(API_URL + 'me')
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
    }

    findFriend(data) {
        return axios.post(API_URL + 'find_friend', {
            'mail': data
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
    }

    insertFriend(data) {
        return axios.post(API_URL + 'insert_friend', data)
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
    }

    listFriend(data) {
        return axios.post(API_URL + 'list_friend', data)
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export default new UserService();
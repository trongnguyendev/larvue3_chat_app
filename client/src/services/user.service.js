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

    getFriendsByStatus(data) {
        return axios.post(API_URL + 'get_relationships_by_status', data)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
    }

    addFriend(data) {
        return axios.post(API_URL + 'create_relationship', data)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
    }

    updateRelationshipByStatus(data) {
        return axios.post(API_URL + 'update_relationship_by_status', data)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
    }

    getLastMessageByGroupName(data) {
        return axios.post(API_URL + 'get_last_message_by_group_name', data)
        .then(response => {
            let messages = [];
            
            Object.entries(response.data.results.message_last_groups).forEach((message, index) => {
                messages[message[1].name] = message[1]
            })

            response.data.results.message_last_groups = messages;
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export default new UserService();
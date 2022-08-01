import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'http://localhost:88/api/';

class MessageService {
    setUserCurrentMessage(data) {
        return axios.post(API_URL + 'create_conversation', data)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
    }

    getCurrentMessageByUser(data) {
        return axios.post(API_URL + 'get_message_by_group_id', data)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
    }

    sentMessage(data) {
        return axios.post(API_URL + 'send_message', data)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export default new MessageService();
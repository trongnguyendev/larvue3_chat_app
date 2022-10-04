import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'http://localhost:88/api/';

class RelationshipService {

    getRelationshipByStatus(data) {
        return axios.post(API_URL + 'get_relationships_by_status', data)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export default new RelationshipService();
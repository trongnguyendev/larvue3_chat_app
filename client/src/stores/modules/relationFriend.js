// import AuthService from '@/services/auth.service';
import UserService from '@/services/user.service'
import RelationshipService from '@/services/relationship.service';
const isToken = JSON.parse(localStorage.getItem('user'));

const initialState = {
    requestFriend: [],
    acceptFriend: [],
}

export default {
    namespaced: true,
    
    state: initialState,

    getters: {
        requestFriend(state) {
            return state.requestFriend
        },

        countRequestFriend(state) {
            return state.requestFriend.length
        }

    },

    mutations: {
        ['PUSH_REQUEST_FRIEND'](state, data) {
            let dataNotification = {
                user_id: data.dataRedis.result.user.id,
                name: data.dataRedis.result.user.name,
                avatar: data.dataRedis.result.profile.avatar,
            }
            state.requestFriend.push(dataNotification)
        },

        ['SET_REQUEST_FRIEND'](state, data) {
            state.requestFriend = data
        },

        ['PUSH_ACCEPTED_FRIEND'](state, data) {
            state.requestFriend.push(data)

        },

        ['REMOVE_REQUEST_FRIEND'](state, id_friend) {
            let friend_change = state.requestFriend.filter(friend => { return friend.user_id != id_friend })
            state.requestFriend = friend_change;
        }



    },

    actions: {
        get_relationship_by_status({ commit }, data) {
            return new Promise((resolve, reject) => {
                RelationshipService.getRelationshipByStatus(data)
                .then((response) => {
                    commit('SET_REQUEST_FRIEND', response.results.relationships)
                })
                .catch((err) => {
                    reject (err)
                })
            })
        }
    }
}
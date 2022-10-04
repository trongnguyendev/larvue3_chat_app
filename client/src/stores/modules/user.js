// import AuthService from '@/services/auth.service';
import UserService from '@/services/user.service'
const isToken = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: [],
    profile: [],
    friends_current: [],
    rooms: [],
    room_current: null,
    room_notify: [],
}

export default {
    namespaced: true,
    state: initialState,

    getters: {
        inforUser(state) {
            return state.user
        },
        friends_current(state) {
            let friends_room = [];
            state.friends_current.forEach((friend, index) => {
                let room = (friend.user_1_id > friend.user_2_id) ? (friend.user_1_id + "_" + friend.user_2_id + "_room") : (friend.user_2_id + "_" + friend.user_1_id + "_room"); 
                friend.room = room;

                friends_room.push(friend)
            });
            return friends_room;
        },
        room_current(state) {
            return state.room_current
        },
        room_notify(state) {
            return state.room_notify;
        }
    },

    mutations: {
        ['SET_INFOR_USER'](state, data) {
            state.user = data
        },

        ['SET_PROFILE_USER'](state, data) {
            state.profile = data
        },
        ['SET_FRIEND'](state, data) {
            state.friends_current = data
        },
        ['PUSH_FRIEND'](state, data) {
            state.friends_current.push(data)
        },
        ['RESET_INFOR'](state, data) {
            state.user = [],
            state.profile = [],
            state.friends_current = [],
            state.room_current = null,
            state.room_notify = []
        },
        ['SET_ROOM_CURRENT'](state, data) {
            state.room_current = data;
        },
        ['SET_ROOM_NOTIFY'](state, data) {
            if(!state.room_notify.includes(data)) {
                state.room_notify.push(data);
            }
        },
        ['REMOVE_ROOM_NOTIFY'](state, data) {
            let room_index = state.room_notify.indexOf(data);
            if(room_index >= 0) {
                state.room_notify.splice(room_index, 1)
            }
            
        },
        ['SET_MESSAGE_NOTIFY'](state, data) {
            state.friends_current.forEach((friend, index) => {
                if(friend.room == data.room) {
                    friend.last_message = data.message.content
                } 
            })
        },
        ['SET_LAST_MESSAGE'](state, dataLastMessage) {
            state.friends_current.forEach((friend, index) => {
                let dataRoomFriend = dataLastMessage[friend.room];
                if(dataRoomFriend) {
                    friend.last_message = dataRoomFriend.content
                    friend.created_at = dataLastMessage[friend.room].created_at
                }
            })
        },
        ['SET_LAST_MESSAGE_BY_ROOM'](state, dataLastMessage) {
            state.friends_current.forEach((friend, index) => {
                if(friend.room == dataLastMessage.room) {
                    friend.last_message = dataLastMessage.content
                    friend.created_at = dataLastMessage.created_at
                }
            })
        }

    },

    actions: {
        getInforMe({ commit }) {
            return new Promise((resolve, reject) => {
                UserService.getInforMe()
                .then((response) => {
                    if(response) {
                        commit('SET_INFOR_USER', response.results.users)
                        commit('SET_PROFILE_USER', response.results.profile)
                        resolve(response)
                    }
                })
                .catch((err) => {
                    reject (err)
                })
            })
        },

        findFriend({ commit }, data) {
            return new Promise((resolve, reject) => {
                UserService.findFriend(data)
                .then((response) => {
                    resolve(response)
                })
                .catch((err) => {
                    reject (err)
                })
            })
        },

        getFriendsByStatus({ commit }, data) {
            return new Promise((resolve, reject) => {
                UserService.getFriendsByStatus(data)
                .then((response) => {
                    commit('SET_FRIEND', response.results.relationships)
                    resolve(response)
                })
                .catch((err) => {
                    reject (err)
                })
            })
        },

        addFriend({ commit }, data) {
            return new Promise((resolve, reject) => {
                UserService.addFriend(data)
                .then((response) => {
                    resolve(response)
                })
                .catch((err) => {
                    reject (err)
                })
            })
        },

        updateRelationshipByStatus({ commit }, data) {
            return new Promise((resolve, reject) => {
                UserService.updateRelationshipByStatus(data)
                .then((response) => {
                    resolve(response)
                })
                .catch((err) => {
                    reject (err)
                })
            })
        },

        getLastMessageByGroupName({ commit, state }) {
            let rooms = [];

            let friends = [...state.friends_current];

            friends.forEach((friend, index) => {
                rooms.push(friend.room)
            })

            return new Promise((resolve, reject) => {
                UserService.getLastMessageByGroupName({'rooms': rooms})
                .then((response) => {
                    if(response.status == 1) {
                        commit('SET_LAST_MESSAGE', response.results.message_last_groups)
                    }
                    resolve(response)
                })
                .catch((err) => {
                    reject (err)
                })
            })
        }
        


    }
}
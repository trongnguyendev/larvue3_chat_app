// import AuthService from '@/services/auth.service';
import MessageService from '@/services/message.service'

const initialState = {
    userMessage: [],
    friendInfor: {
        name: '',
        email: '',
        avarta: '',
        friend_id: '',
    },
    
}

export default {
    namespaced: true,
    state: initialState,

    getters: {
        userMessage(state) {
            return state.userMessage
        },
        friendInfor(state) {
            return state.friendInfor
        }
    },

    mutations: {
        ['SET_CURRENT_USER_MESSAGE'](state, data) {
            state.userMessage = data
        },
        ['ADD_MESSAGE'](state, data) {
            state.userMessage.push(data)
        },
        ['SET_FRIEND_INFOR'](state, data) {
            state.friendInfor = data
        }

    },

    actions: {
        loadcurrentMessageByUser({ commit }, data) {
            return new Promise((resolve, reject) => {
                MessageService.getCurrentMessageByUser(data)
                .then((response) => {
                    commit('SET_CURRENT_USER_MESSAGE', response.results.conversation)

                    let friend_infro = response.results.friend_infor
                    let data = {
                        name: friend_infro.name,
                        email: friend_infro.email,
                        avarta: friend_infro.profile.avarta,
                        friend_id: friend_infro.id
                    }
                    commit('SET_FRIEND_INFOR', data)
                    resolve(response)
                })
                .catch((err) => {
                    reject (err)
                })
            })
        },
        
        setCurrentUserMessage({ commit }, data) {
            return new Promise((resolve, reject) => {
                MessageService.setUserCurrentMessage(data)
                .then((response) => {
                    commit('ADD_MESSAGE', response.results.message)
                    resolve(response)
                })
                .catch((err) => {
                    reject (err)
                })
            })
        },
    }
}
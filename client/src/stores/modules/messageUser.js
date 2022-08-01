import MessageService from '@/services/message.service'

const initialState = {
    userMessage: [],
    friendInfor: {},
    groupId: null,
    messages: [],
    
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
        },
        messages(state) {
            return state.messages
        }
    },

    mutations: {
        ['SET_FRIEND_MESSENGER_INFOR'](state, data) {
            state.friendInfor = data
        },

        ['SET_GROUP_ID'](state, data) {
            state.groupId = data
        },

        ['SET_MESSAGES_CURRENT'](state, data) {
            state.messages = data
        },

        ['PUSH_MESSAGE'](state, data) {
            state.messages.push(data)
        }

    },

    actions: {

        sendMessage({ commit }, data) {
             return new Promise((resolve, reject) => {
                MessageService.sentMessage(data)
                .then((response) => {
                    resolve(response)
                })
                .catch((err) => {
                    reject (err)
                })
             })
        },

        getMessageByGroup({ commit }, data) {
            return new Promise((resolve, reject) => {
                MessageService.getCurrentMessageByUser(data)
                .then((response) => {
                    commit('SET_GROUP_ID', response.results.group_id)
                    commit('SET_MESSAGES_CURRENT', response.results.messages)
                    resolve(response)
                })
                .catch((err) => {
                    reject (err)
                })
            })
        }
    }
}
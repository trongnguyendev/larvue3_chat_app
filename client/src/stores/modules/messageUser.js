import MessageService from '@/services/message.service'

const initialState = {
    userMessage: [],
    friendInfor: {},
    groupId: null,
    messages: [],
    typing: false,
    
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
            let messages = state.messages.sort((m1, m2) => {
                return m1.id - m2.id
            })
            return messages
        },
        isTyping(state) {
            return state.typing
        },
        lastIdMessage(state) {
            if(state.messages.length == 0) {
                return null;
            }
            let messageLast = state.messages.slice(0,1)
            return messageLast[0].id
        },
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
        },
        ['SET_TYPING'](state, data) {
            if(data.auth_id == state.friendInfor.user_id) {
                state.typing = data.type
            }
        },
        ['RESET_MESSAGE_USER'](state, data) {
            state.friendInfor = {},
            state.groupId = null,
            state.messages = [],
            state.typing = false
        },
        ['LOAD_MORE_MESSAGE'](state, data) {
            state.messages.push(...data)
        },
        ['CLEAR_MESSAGE'](state, data) {
            state.messages = []
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
                    if(!data.fromMessage) {
                        commit('SET_GROUP_ID', response.results.group_id)
                        commit('SET_MESSAGES_CURRENT', response.results.messages)
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
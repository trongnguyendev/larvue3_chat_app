const initialState = {
    active: false,
    title: '',
    message: '',
    type: ''
}

export default {
    namespaced: true,
    state: initialState,
    getters: {
        activeNotification(state) {
            return state.active
        }
    },

    mutations: {
        ['SHOW_NOTIFICATION'](state, data) {
            state.active = data
        },
        ['SET_TITLE'](state, data) {
            state.title = data
        },
        ['SET_MESSAGE'](state, data) {
            state.message = data
        },
        ['SET_TYPE'](state, data) {
            state.type = data
        },
        ['RESET_NOTIFICATION'](state) {
            state.active = false,
            state.title = '',
            state.message = '',
            state.type = ''
        }
    },

    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                AuthService.login(user)
                .then((response) => {
                    if(response.status == 1) {
                        commit('AUTH_SUCCESS', response.results.access_token)
                    } else {
                        commit('AUTH_ERROR')
                    }
                    
                    resolve(response)
                })
                .catch((err) => {
                    commit('AUTH_ERROR')
                    reject(err)
                })
            })
        },

        showNotification({ commit }, data) {
            if(data.title) {
                commit('SET_TITLE', data.title)
            }

            if(data.message) {
                commit('SET_MESSAGE', data.message)
            }

            if(data.type) {
                commit('SET_TYPE', data.type)
            }

            commit('SHOW_NOTIFICATION', true)
        },

        resetNotification({ commit }) {
            commit('RESET_NOTIFICATION')
        }
    }
}
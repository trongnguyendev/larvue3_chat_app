import AuthService from '@/services/auth.service';
const isToken = JSON.parse(localStorage.getItem('user'));

const initialState = isToken ? 
{
    token: isToken,
    loggedIn: true
} 
: 
{
    token: null,
    loggedIn: false
}

export default {
    namespaced: true,
    state: initialState,

    getters: {
        isLoggedIn(state) {
            return state.loggedIn
        }
    },

    mutations: {
        ['AUTH_SUCCESS'](state, token) {
            state.token = token
            state.loggedIn = true
        } ,

        ['SET_LOGOUT'](state) {
            state.token = null
            state.loggedIn = false
        },

        ['AUTH_ERROR'](state) {
            state.token = null
            state.loggedIn = false
        },

        ['REFRESH_TOKEN'](state, token) {
            state.token = token
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

        logout({ commit }) {
            AuthService.logout();
            commit('SET_LOGOUT');
        },

        register({ commit }, user) {
            return new Promise((resolve, reject) => {
              AuthService.register(user)
              .then((response) => {
                resolve(response)
              })
              .catch((err) => {
                reject(err)
              })
            })
        },

        forgotPassword({ commit }, email) {
            return new Promise((resolve, reject) => {
                AuthService.forgotPassword(email)
                .then((response) => {
                    resolve(response)
                })
                .catch((err) => {
                    reject(err)
                })
            })
        },

        resetPassword({ commit }, data) {
            return new Promise((resolve, reject) => {
                AuthService.resetPassword(data)
                .then((response) => {
                    resolve(response)
                })
                .catch((err) => {
                    reject(err)
                })
            })
        },
        

        me({ commit }) {
            return new Promise((resolve, reject) => {
                AuthService.me()
                .then((response) => {
                    resolve(response)
                })
                .catch((err) => {
                    reject (err)
                })
            })
        },

        
    }
}
// import AuthService from '@/services/auth.service';
import UserService from '@/services/user.service'
const isToken = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: [],
    profile: [],
    friends_current: []
}

export default {
    namespaced: true,
    state: initialState,

    getters: {
        inforUser(state) {
            return state.user
        },
        friends_current(state) {
            return state.friends_current
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
                console.log(data.status)
                UserService.updateRelationshipByStatus(data)
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
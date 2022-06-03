// import AuthService from '@/services/auth.service';
import UserService from '@/services/user.service'
const isToken = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: [],
    profile: [],
    friends: []
}

export default {
    namespaced: true,
    state: initialState,

    getters: {
        inforUser(state) {
            return state.user
        },
        friends(state) {
            return state.friends
        }
    },

    mutations: {
        ['SET_INFOR_USER'](state, data) {
            state.user = data
        },

        ['SET_PROFILE_USER'](state, data) {
            state.profile = data
        },
        ['GET_FRIEND'](state, data) {
            state.friends = data
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

        insertFriend({ commit }, data) {
            return new Promise((resolve, reject) => {
                UserService.insertFriend(data)
                .then((response) => {
                    resolve(response)
                })
                .catch((err) => {
                    reject (err)
                })
            })
        },

        listFriend({ commit }, data) {
            return new Promise((resolve, reject) => {
                UserService.listFriend(data)
                .then((response) => {
                    commit('GET_FRIEND', response.results.user_friend)
                    resolve(response.results.user_friend)
                })
                .catch((err) => {
                    reject (err)
                })
            })
        }
        


    }
}
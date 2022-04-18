import AuthService from '@/services/auth.service';
const user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? 
{
    status: { loggedIn: true },
    user
} 
: 
{
    status: { loggedIn: false },
    user: null
}

export default {
    namespaced: true,
    state: initialState,

    getters: {
        
    },

    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = user;
            state.user = user
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    },

    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
              user => {
                commit('logginSuccess', user);
                return Promise.resolve(user);
              },
              error => {
                commit('loginFailure');
                return Promise.reject(error);
              }
            )
        },

        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },

        register({ commit }, user) {
            return new Promise((resolve, reject) => {
              AuthService.register(user)
              .then((response) => {
                commit('registerSuccess');
                resolve(response)
              })
              .catch((err) => {
                commit('registerFailure');
                reject(err)
              })
            })
        }
    }
}
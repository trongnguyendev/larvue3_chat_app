import { createStore } from 'vuex'
import * as types from './mutation-types'

import auth from './modules/auth';

const store = createStore({
    modules: {
      auth
    },

    state: {
      darkMode: false,
    },

    getters : {
      darkMode: (state) => state.darkMode
    },

    mutations: {
      SET_DARK: (state, bool) => {
        state.darkMode = bool
      },
    },

    actions: {
      SET_DARKMODE ({ commit }, dark) {
        commit('SET_DARK', dark)
      },

      // authentication
      // login({ commit }, user) {
      //   return AuthService.login(user).then(
      //     user => {
      //       commit('logginSuccess', user);
      //       return Promise.resolve(user);
      //     },
      //     error => {
      //       commit('loginFailure');
      //       return Promise.reject(error);
      //     }
      //   )
      // },

      // logout({ commit }) {
      //   AuthService.logout();
      //   commit('logout');
      // },
      // register({ commit }, user) {
      //   return new Promise((resolve, reject) => {
      //     AuthService.register(user)
      //     .then((response) => {
      //       commit('registerSuccess');
      //       resolve(response)
      //     })
      //     .catch((err) => {
      //       commit('registerFailure');
      //       reject(err)
      //     })
      //   })

        // return AuthService.register(user).then(
        //   response => {
        //     commit('registerSuccess');
        //     return Promise.resolve(response);
        //   },
        //   error => {
        //     commit('registerFailure');
        //     return Promise.reject(error);
        //   }
        // );
      // }
    },
})



export default store
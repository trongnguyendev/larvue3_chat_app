import { createStore } from 'vuex'
import * as types from './mutation-types'

import auth from './modules/auth';
import notification from './modules/notification';

const store = createStore({
    modules: {
      auth,
      notification
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
    },
})



export default store
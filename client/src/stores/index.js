import { createStore } from 'vuex'
import * as types from './mutation-types'

import auth from './modules/auth';
import notification from './modules/notification';
import user from './modules/user';
import messageUser from './modules/messageUser'; 
import relationFriend from './modules/relationFriend';

import { webSocketServer } from '@/config/socket';

const store = createStore({
    modules: {
      auth,
      notification,
      user,
      messageUser,
      relationFriend,
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

    plugins: [webSocketServer],
})



export default store
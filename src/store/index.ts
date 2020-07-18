import Vue from 'vue';
import Vuex from 'vuex';
import { User } from '@/models';
import { getAuth, removeAuth, createAuth } from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null as null | User,
    auth: getAuth(),
  },
  mutations: {
    login(state, token: string): void {
      state.auth = createAuth(token);
      if (state.auth.id !== state.user?.id) {
        state.user = null;
      }
    },
    logout(state) {
      state.user = null;
      state.auth = removeAuth();
    },
    setUser(state, user: User | null) {
      if (!user) {
        state.user = null;
      } else if (user.id === state.auth.id) {
        state.user = user;
      }
    },
  },
  actions: {
  },
  modules: {
  },
});

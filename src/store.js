import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '', 
    username: '',
    email: ''
  },
  mutations: {
    updateUser(state, user) {
      const { name, username, email } = user;
      state.name = name;
      state.username = username;
      state.email = email;
    }, 
    logoutUser(state) {
      state.name = '';
      state.username = '';
      state.email = '';
    }
  },
  actions: {

  }
})

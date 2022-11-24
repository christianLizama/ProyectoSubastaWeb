import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    port: "3000",
    localhost: "",
    usuarioLogeado: {},
    

  },
  getters: {
    getLocalhost(state) {
      state.localhost = "http://localhost:" + state.port + "/api"
      console.log(state.localhost)
      return state.localhost
    }
  },
  mutations: {
  },
  actions: {
    cambioHost() {
      
    }
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarioLogeado: {},
  },
  getters: {

  },
  mutations: {
    setUsuario(state, usuario) {
      state.usuarioLogeado = usuario;
    }
  },
  actions: {
    guardarUsuario({ commit }, usuario) {

      commit("setUsuario", usuario)
      localStorage.setItem("usuario", JSON.stringify(usuario))

    },
    autoLogin({ commit }) {
      let usuario = localStorage.getItem("usuario");
      console.log(usuario)
      if (usuario) {

        let user = JSON.parse(usuario)
        commit("setUsuario", user)

        if (user.tipoUsuario == "Licitador") {
          router.push({ path: '/cliente' }).catch(() => {})
        }
        else if (user.tipoUsuario == "Martillero") {
          router.push({ path: '/martillero' }).catch(() => {})
        }
        else {
          router.push({ path: '/admin' }).catch(() => {})
        }


      }

    },
    salir({ commit }) {
      commit("setUsuario", null);
      localStorage.removeItem("usuario");
    }
  },
  modules: {
  }
})

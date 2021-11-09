import Token from '@/router/verify/code'

export default {
  namespaced: true,
  state: _ => ({ code: Token.get() }),
  mutations: {
    SET_CODE: (state, code) => (state.code = code)
  },
  actions: {
    set: ({ commit }, code) => {
      commit('SET_CODE', code)
      Token.set(code)
    },
    clear: ({ commit }) => {
      Token.remove()
      commit('SET_CODE')
    }
  }
}

import Code from '@/router/verify/code'

export default {
  namespaced: true,
  state: _ => ({ code: Code.native() }),
  mutations: {
    SET_CODE: (state, code) => (state.code = code)
  },
  actions: {
    set: ({ commit }, code) => {
      commit('SET_CODE', code)
      Code.set(code)
    },
    clear: ({ commit }) => {
      Code.remove()
      commit('SET_CODE')
    }
  }
}

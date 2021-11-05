export default {
  namespaced: true,
  state: {
    code: null
  },
  mutations: {
    SET_CODE: (state, code) => (state.code = code)
  },
  actions: {
    set: ({ commit }, code) => commit('SET_CODE', code),
    clear: ({ commit }) => commit('SET_CODE')
  }
}

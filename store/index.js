export const state = () => ({
  isAuthenticated: false,
})

export const mutations = {
  changeAuth(state, payload) {
    state.isAuthenticated = payload
  },
}

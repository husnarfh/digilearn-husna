export const state = () => ({
  token: localStorage.getItem('token'),
})

export const mutations = {
  saveToken(state, token) {
    localStorage.setItem('token', token)
    state.token = token
  },
}
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },
}

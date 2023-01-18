export default {
  setAuthToken(state, token) {
    state.authToken = token;
  },
  setRefreshToken(state, token) {
    state.refreshToken = token;
  },
  setIdToken(state, token) {
    state.idToken = token;
  },
  setVerifData(state, data) {
    state.verifData = data;
  },
  setUser(state, user) {
    state.user = user;
  },
}

export default {
  isAdmin(state) {
    return state.user ? state.user.roles.includes('ADMIN') : false;
  },
  isSystemUser(state) {
    return state.user ? state.user.roles.includes('SYSTEM') : false;
  },
  isLoggedIn(state) {
    return Boolean(state.user);
  },
  user(state) {
    return state.user;
  }
}
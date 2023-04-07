export default {
  idToken(state) {
    return state.idToken;
  },
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
  },
  userId(state) {
    return state.user ? state.user.userId : null;
  },
  emailVerified(state) {
    return state.user ? state.user.emailVerified : false;
  },
  phoneVerified(state) {
    return state.user ? state.user.phoneVerified : false;
  },
  registeredVia(state) {
    return state.user ? state.user.registeredVia : null;
  }
}
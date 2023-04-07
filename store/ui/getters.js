export default {
  messages(state) {
    return state.messages;
  },
  showMainLeftNav(state) {
    return state.showMainLeftNav;
  },
  showUserDashboardLeftNav(state) {
    return state.showUserDashboardLeftNav;
  },
  showMainRightNav(state) {
    return state.showMainRightNav;
  },
  showLoginModal(state) {
    return state.loginModal.show
  },
  loginModalAction(state) {
    return state.loginModal.action
  },
  showGlobalLoader(state) {
    return state.globalLoader.show
  }
}
export default () => ({
  messages: [],
  showMainLeftNav: false,
  showUserDashboardLeftNav: false,
  showMainRightNav: false,
  showVerifyDeviceModal: false,
  mainLeftNav: {
    show: false,
    clipped: true,
    miniVariant: false,
  },
  loginModal: {
    show: false,
    action: '',
  },
  globalLoader: {
    show: true,
    message: 'Loading...',
  }
})
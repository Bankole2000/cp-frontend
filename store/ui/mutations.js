export default {
  showMessage(state, payload) {
    state.messages.push(payload)
  },
  updateMessage(state, payload) {
    const idx = state.messages.findIndex(m => m.uuid === payload.uuid);
    const messageUpdate = state.messages[idx];
    if (!messageUpdate) return;

    for (const prop in payload) {

      if (prop === 'uuid') continue;
      messageUpdate[prop] = payload[prop];
    }

    // messageUpdate = { ...messageUpdate, ...payload };
    console.log({ messageUpdate })
    state.messages.splice(idx, 1, messageUpdate);
  },
  removeMessage(state, payload) {
    const index = state.messages.findIndex(m => m.uuid === payload);
    state.messages.splice(index, 1);
  },
  setMessages(state, payload) {
    state.messages = payload;
  },
  toggleMainLeftNav(state, payload) {
    if (payload !== undefined) {
      state.showMainLeftNav = payload;
      return;
    }
    state.showMainLeftNav = !state.showMainLeftNav;
  },
  toggleUserDashboardLeftNav(state, payload) {
    if (payload !== undefined) {
      state.showUserDashboardLeftNav = payload;
      return;
    }
    state.showUserDashboardLeftNav = !state.showUserDashboardLeftNav;
  },
  toggleMainRightNav(state, payload) {
    if (payload !== undefined) {
      state.showMainRightNav = payload;
      return;
    }
    state.showMainRightNav = !state.showMainRightNav;
  },
  showVerifyDeviceModal(state, payload) {
    if (payload !== undefined) {
      state.showVerifyDeviceModal = payload;
      return;
    }
    state.showVerifyDeviceModal = !state.showVerifyDeviceModal;
  }
}
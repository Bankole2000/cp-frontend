const short = require('short-uuid');

const translator = short();

export default {
  showMessage({ commit }, { message = { text: "", title: "", loading: false }, timeout = -1, color = "", uuid = translator.new() }) {
    commit("showMessage", { color, message, timeout, uuid });
    return uuid;
  },
  updateMessage({ commit }, payload) {
    commit("updateMessage", payload);
  },
  removeMessage({ commit }, uuid) {
    commit("removeMessage", uuid);
  },
  testEnv({ rootState }) {
    console.log({ env: rootState.env });
  },
  toggleMainLeftNav({ commit }, value) {
    commit("toggleMainLeftNav", value);
  },
  showLoginModal({ commit }, { show = true, action = '' }) {
    commit("showLoginModal", { show, action });
  },
  showGlobalLoader({ commit }, { show = true, action = '' }) {
    commit("showGlobdalLoader", { show, action });
  }
}
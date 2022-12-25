import { loadingMessage, infoMessage, errorMessage, successMessage } from "~/utils/messaging";

export default {
  async getMe({ commit, rootState, dispatch }) {
    const message = loadingMessage({});
    const uuid = await dispatch('ui/showMessage', message, { root: true })
    try {
      const response = await this.$axios.$get(`${rootState.env.authPath}/currentuser/me`);
      console.log({ response });
      if (response.success) {
        commit('setUser', response.data)
        await dispatch('ui/updateMessage', {
          uuid,
          ...infoMessage({ text: `${response.message}` })
        }, { root: true })
      }
      return response;
    } catch (error) {
      console.log({ error });
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: `${error.response.data.message}` })
      }, { root: true })
      return error.response;
    }
  },
  async loginWithEmail({ commit, rootState, dispatch }, { email, password }) {
    const message = loadingMessage({ text: 'Logging in...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.authPath}/login/email`, { email, password });
      console.log({ response });
      if (response.success) {
        const { accessToken, refreshToken, user } = response.data;
        await dispatch('setTokens', { accessToken, refreshToken });
        commit('setUser', user);
        this.$axios.setToken(accessToken, 'Bearer');
        await dispatch('ui/updateMessage', {
          uuid,
          ...successMessage({ text: `${response.message}` })
        }, { root: true })
      }
      return response;
    } catch (error) {
      console.log({ error });
      if (error.response.data.idToken) {
        await dispatch('setIdToken', { idToken: error.response.data.idToken });
      }
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: `${error.response.data.message || 'Something went wrong'}` })
      }, { root: true })
      return error.response;
    }
  },
  async loginWithUsername({ commit, rootState, dispatch }, { username, password }) {
    const message = loadingMessage({ text: 'Logging in...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.authPath}/login/username`, { username, password });
      console.log({ response });
      if (response.success) {
        const { accessToken, refreshToken, user } = response.data;
        await dispatch('setTokens', { accessToken, refreshToken });
        commit('setUser', user);
        this.$axios.setToken(accessToken, 'Bearer');
        await dispatch('ui/updateMessage', {
          uuid,
          ...successMessage({ text: `${response.message}` })
        }, { root: true })
      }
      return response;
    } catch (error) {
      console.log({ error });
      if (error.response.data.idToken) {
        await dispatch('setIdToken', { idToken: error.response.data.idToken });
      }
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: `${error.response.data.message || 'Something went wrong'}` })
      }, { root: true })
      return error.response;
    }
  },
  async loginWithPhoneNumber({ commit, rootState, dispatch }, { phone, countryCode, password }) {
    const message = loadingMessage({ text: 'Logging in...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.authPath}/login/phone`, { phone, countryCode, password });
      if (response.success) {
        const { accessToken, refreshToken, user } = response.data;
        await dispatch('setTokens', { accessToken, refreshToken });
        commit('setUser', user);
        this.$axios.setToken(accessToken, 'Bearer');
        await dispatch('ui/updateMessage', {
          uuid,
          ...successMessage({ text: `${response.message}` })
        }, { root: true });
      }
      return response;
    } catch (error) {
      console.log({ error });
      if (error.response.data.idToken) {
        await dispatch('setIdToken', { idToken: error.response.data.idToken });
      }
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: `${error.response.data.message || 'Something went wrong'}` })
      }, { root: true })
      return error.response;
    }
  },
  async logout({ commit, rootState, dispatch }) {
    const message = loadingMessage({ text: 'Logging out...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$get(`${rootState.env.authPath}/logout`);
      if (response.success) {
        await dispatch('clearTokens');
        commit('setUser', null);
        this.$axios.setToken(false);
        await dispatch('ui/updateMessage', {
          uuid,
          ...successMessage({ text: `${response.message}` })
        }, { root: true });
      }
    } catch (error) {
      console.log({ error });
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: `${error.response.data.message || 'Something went wrong'}` })
      }, { root: true });
      return error.response;
    }
  },
  async registerWithEmail({ commit, rootState, dispatch }, { firstname, lastname, email, dob, tos }) {
    const message = loadingMessage({ text: 'Signing up with email...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.authPath}/register/email`, { firstname, lastname, email, dob, tos });
      console.log(response);
      if (response.success) {
        const { user, idToken } = response.data;
        commit('setUser', user);
        await dispatch('setIdToken', { idToken });
        await dispatch('ui/updateMessage', {
          uuid,
          ...successMessage({ text: `${response.message}` })
        }, { root: true });
      }
      return response;
    } catch (error) {
      console.log({ error });
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: `${error.response.data.message || 'Something went wrong'}` })
      }, { root: true });
      return error.response;
    }
  },
  async registerWithPhoneNumber({ commit, rootState, dispatch }, { firstname, lastname, phone, countryCode, dob, tos }) {
    const message = loadingMessage({ text: 'Signing up with phone number...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.authPath}/register/phone`, { firstname, lastname, phone, countryCode, dob, tos });
      console.log(response);
      if (response.success) {
        const { user, idToken } = response.data;
        commit('setUser', user);
        await dispatch('setIdToken', { idToken });
        await dispatch('ui/updateMessage', {
          uuid,
          ...successMessage({ text: `${response.message}` })
        }, { root: true });
      }
      return response;
    } catch (error) {
      console.log({ error });
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: `${error.response.data.message || 'Something went wrong'}` })
      }, { root: true });
      return error.response;
    }
  },
  async onboard({ commit, rootState, dispatch }, { username, gender, password, confirmPassword }) {
    const message = loadingMessage({ text: 'Completing your signup...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.authPath}/register/onboarding/username`, { username, gender, password, confirmPassword, idToken: rootState.auth.idToken });
      console.log(response);
      if (response.success) {
        const { accessToken, refreshToken, user } = response.data;
        commit('setUser', user);
        await dispatch('setIdToken', { idToken: null });
        await dispatch('setTokens', { accessToken, refreshToken })
        await dispatch('ui/updateMessage', {
          uuid,
          ...successMessage({ text: `${response.message}` })
        }, { root: true });
      }
      return response;
    } catch (error) {
      console.log({ error });
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: `${error.response.data.message || 'Something went wrong'}` })
      }, { root: true });
      return error.response;
    }
  },
  async verifyDeviceLogin({ commit, rootState, dispatch }, { userId, code, email, type, phone, deviceId }) {
    const message = loadingMessage({ text: 'Verifying Device...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      let response;
      if (type === 'EMAIL') {
        response = await this.$axios.$post(`${rootState.env.authPath}/verify/verify-device-login`, { userId, code, email, deviceId, type });
      } else {
        response = await this.$axios.$post(`${rootState.env.authPath}/verify/verify-device-login`, { userId, code, phone, deviceId, type });
      }
      console.log(response);
      if (response.success) {
        const { accessToken, refreshToken, user } = response.data;
        await dispatch('setIdToken', { idToken: null });
        await dispatch('setTokens', { accessToken, refreshToken })
        commit('setUser', user);
        await dispatch('ui/updateMessage', {
          uuid,
          ...successMessage({ text: `${response.message}` })
        }, { root: true });
      }
      return response;
    } catch (error) {
      console.log({ error });
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: `${error.response.data.message || 'Something went wrong'}` })
      }, { root: true });
      return error.response;
    }
  },
  setTokens({ commit }, { accessToken, refreshToken }) {
    commit('setAuthToken', accessToken)
    commit('setRefreshToken', refreshToken)
    localStorage.setItem('cp-access', accessToken);
    localStorage.setItem('cp-refresh', refreshToken);
  },
  setIdToken({ commit }, { idToken }) {
    commit('setIdToken', idToken)
    if (idToken) {
      localStorage.setItem('cp-id', idToken);
    } else {
      localStorage.removeItem('cp-id');
    }
  },
  clearTokens({ commit }) {
    commit('setAuthToken', null)
    commit('setRefreshToken', null)
    commit('setIdToken', null)
    localStorage.removeItem('cp-access');
    localStorage.removeItem('cp-refresh');
    localStorage.removeItem('cp-id');
  }
}
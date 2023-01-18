import Cookie from "js-cookie";
import { loadingMessage, errorMessage, successMessage } from "~/utils/messaging";

export default {
  async getMe({ commit, state, rootState, dispatch }) {
    // if (!state.refreshToken) {
    //   return;
    // }
    try {
      const response = await this.$axios.$get(`${rootState.env.authPath}/currentuser/me`);
      console.log({ response });
      if (response.success) {
        const { accessToken, user } = response.data;
        const { newAccessToken } = response;
        commit('setUser', user)
        if (newAccessToken) {
          await dispatch('setTokens', { accessToken: newAccessToken, refreshToken: state.refreshToken });
          this.$axios.setToken(newAccessToken, 'Bearer');
        } else {
          await dispatch('setTokens', { accessToken, refreshToken: state.refreshToken });
          this.$axios.setToken(accessToken, 'Bearer');
        }
      }
      return response;
    } catch (error) {
      console.log({ error, response: error.response });
      return error.response ? error.response.data : error;
    }
  },
  async loginWithEmail({ commit, rootState, dispatch }, { email, password }) {
    const message = loadingMessage({ text: 'Logging in...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.authPath}/login/email`, { email, password });
      console.log({ response });
      if (response.success) {
        return await dispatch('handleLoginSuccess', { response, uuid });
      }
      return response;
    } catch (error) {
      return await dispatch('handleLoginError', { error, uuid });
    }
  },
  async loginWithUsername({ commit, rootState, dispatch }, { username, password }) {
    const message = loadingMessage({ text: 'Logging in...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.authPath}/login/username`, { username, password });
      console.log({ response });
      if (response.success) {
        return await dispatch('handleLoginSuccess', { response, uuid });
      }
      return response;
    } catch (error) {
      return await dispatch('handleLoginError', { error, uuid });
    }
  },
  async loginWithPhoneNumber({ commit, rootState, dispatch }, { phone, countryCode, password }) {
    const message = loadingMessage({ text: 'Logging in...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.authPath}/login/phone`, { phone, countryCode, password });
      if (response.success) {
        return await dispatch('handleLoginSuccess', { response, uuid });
      }
      return response;
    } catch (error) {
      return await dispatch('handleLoginError', { error, uuid });
    }
  },
  async handleLoginError({ dispatch }, { error, uuid }) {
    if (!error) {
      return null;
    }
    console.log({ error, response: error.response });
    if (!error.response) {
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: 'Something went wrong. Please try again.' })
      }, { root: true })
      return error.response ? error.response.data : error;
    }
    if (!error.response.data.data) {
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: error.response.data.message })
      }, { root: true })
      return error.response ? error.response.data : error;
    }
    if (error.response.data.data.idToken) {
      await dispatch('setIdToken', { idToken: error.response.data.data.idToken });
    }
    await dispatch('ui/updateMessage', {
      uuid,
      ...errorMessage({ text: error.response.data.message })
    }, { root: true })
    return error.response ? error.response.data : error;
  },
  async handleLoginSuccess({ commit, dispatch }, { response, uuid }) {
    const { accessToken, refreshToken, user } = response.data;
    await dispatch('setTokens', { accessToken, refreshToken });
    commit('setUser', user);
    this.$axios.setToken(accessToken, 'Bearer');
    await dispatch('ui/updateMessage', {
      uuid,
      ...successMessage({ text: `${response.message}` })
    }, { root: true })
    return response;
  },
  async logout({ commit, rootState, dispatch }) {
    const message = loadingMessage({ text: 'Logging out...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$get(`${rootState.env.authPath}/logout`);
      if (response.success) {
        Cookie.remove('refreshToken');
        Cookie.remove('accessToken');
        await dispatch('clearTokens');
        commit('setUser', null);
        this.$axios.setToken(false);
        await dispatch('ui/updateMessage', {
          uuid,
          ...successMessage({ text: `${response.message}` })
        }, { root: true });
      }
      return response;
    } catch (error) {
      if (!error) {
        return error;
      }
      console.log({ error });
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: error.response.data.message })
      }, { root: true });
      return error.response ? error.response.data : error;
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
      if (!error) {
        return error;
      }
      console.log({ error });
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: error.response.data.message })
      }, { root: true });
      return error.response ? error.response.data : error;
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
      if (!error) {
        return error;
      }
      console.log({ error });
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: error.response.data.message })
      }, { root: true });
      return error.response ? error.response.data : error;
    }
  },
  async resendOTP({ rootState, state, dispatch }, { type, email, phone, userId }) {
    const message = loadingMessage({ text: `Resending Verification Code...` });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.authPath}/verify/otp/resend`, { type, email, phone, userId, idToken: state.idToken });
      console.log(response);
      if (response.success) {
        await dispatch('ui/updateMessage', {
          uuid,
          ...successMessage({ text: `${response.message}` })
        }, { root: true });
      }
      return response;
    } catch (error) {
      if (!error) {
        return error;
      }
      console.log({ error });
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: error.response.data.message })
      }, { root: true });
      return error.response ? error.response.data : error;
    }
  },
  async verifyOTP({ commit, state, rootState, dispatch }, { OTP, type, email, phone, userId }) {
    const message = loadingMessage({ text: `Verifying ${type.toLowerCase()} OTP...` });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.authPath}/verify/otp/verify`, { OTP, type, email, phone, userId, idToken: state.idToken });
      console.log(response);
      if (response.success) {
        const { data: user } = response;
        commit('setUser', user);
        await dispatch('ui/updateMessage', {
          uuid,
          ...successMessage({ text: `${response.message}` })
        }, { root: true });
      } else {

        await dispatch('ui/updateMessage', {
          uuid,
          ...errorMessage({ text: `${response.message}` })
        }, { root: true });
      }
      return response;
    } catch (error) {
      if (!error) {
        return error;
      }
      console.log({ error });
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: error.response.data.message })
      }, { root: true });
      return error.response ? error.response.data : error;
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
      if (!error) {
        return error;
      }
      console.log({ error });
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: 'Something went wrong' })
      }, { root: true });
      return error.response ? error.response.data : error;
    }
  },
  async verifyDeviceLogin({ commit, rootState, state, dispatch }, { userId, code, email, type, phone, username, deviceId }) {
    const message = loadingMessage({ text: 'Verifying Device...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.authPath}/verify/verify-device-login`, { userId, code, email, phone, username, deviceId, type, idToken: state.idToken });
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
      if (!error) {
        return error;
      }
      console.log({ error });
      await dispatch('ui/updateMessage', {
        uuid,
        ...errorMessage({ text: error.response.data.message })
      }, { root: true });
      return error.response ? error.response.data : error;
    }
  },
  async sendForgotPasswordRequest({ commit, rootState, dispatch }, { username, email, phone, field, countryCode }) {
    const message = loadingMessage({ text: 'Searching...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.authPath}/verify/forgot-password`, { username, email, phone, countryCode, field })
      if (response.success) {
        const { user, idToken, verifData } = response.data;
        commit('setUser', user);
        commit('setIdToken', idToken);
        commit('setVerifData', verifData);
        await dispatch('ui/updateMessage', {
          uuid,
          ...successMessage({ text: `${response.message}` })
        }, { root: true });
      } else {
        await dispatch('ui/updateMessage', {
          uuid,
          ...errorMessage({ text: `${response.message}` })
        }, { root: true });
      }
      return response;
    } catch (error) {
      console.log({ error });
      await dispatch('ui/updateMessage', { uuid, ...errorMessage({ text: error.response ? error.response.data.message : 'Something went wrong' }) }, { root: true });
      return error.response.data;
    }
  },
  async setNewPassword({ rootState, state, dispatch }, { password, confirmPassword, userId, type, phone, email }) {
    const message = loadingMessage({ text: 'Setting new password...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.authPath}/register/onboarding/password`, { password, confirmPassword, idToken: state.idToken, userId, type, email, phone });
      if (response.success) {
        await dispatch('clearTokens');
        await dispatch('ui/updateMessage', {
          uuid,
          ...successMessage({ text: `${response.message}` })
        }, { root: true });
      }
      return response;
    } catch (error) {
      console.log({ error });
      await dispatch('ui/updateMessage', { uuid, ...errorMessage({ text: error.response ? error.response.data.message : 'Something went wrong' }) }, { root: true });
      return error.response ? error.response.data : error
    }
  },
  setTokens({ commit }, { accessToken, refreshToken }) {
    commit('setAuthToken', accessToken)
    commit('setRefreshToken', refreshToken)
    if (process.client) {
      localStorage.setItem('cp-access', accessToken);
      localStorage.setItem('cp-refresh', refreshToken);
    }
    Cookie.set('refreshToken', refreshToken, { expires: 7 });
    Cookie.set('accessToken', accessToken, { expires: 1 / (24 * 4) });
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
    if (process.client) {
      localStorage.removeItem('cp-access');
      localStorage.removeItem('cp-refresh');
      localStorage.removeItem('cp-id');
    }
  },
  async initAuth({ commit, dispatch }, req) {
    console.log('dispatching initAuth');
    // this.$axios.setToken(false);
    console.log({ isServer: process.server, isClient: process.client, req });
    if (req && process.server) {
      if (!req.headers.cookie) {
        return;
      }
      const refreshCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('refreshToken='));
      const accessCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('accessToken='));
      console.log({ refreshCookie, accessCookie });
      if (!refreshCookie) {
        return;
      }
      const refreshToken = refreshCookie.split('=')[1];

      const accessToken = accessCookie ? accessCookie.split('=')[1] : "";
      console.log('refreshToken Found');
      console.log({ refreshToken });
      console.log('accessToken Found');
      console.log({ accessToken });
      commit('setRefreshToken', refreshToken);
      commit('setAuthToken', accessToken);
      this.$axios.setToken(accessToken, 'Bearer');
      await dispatch('getMe');
    } else {
      const accessToken = localStorage.getItem('cp-access');
      const refreshToken = localStorage.getItem('cp-refresh');
      const idToken = localStorage.getItem('cp-id');
      if (accessToken && refreshToken) {
        commit('setAuthToken', accessToken)
        commit('setRefreshToken', refreshToken)
        await dispatch('getMe');
      }
      if (idToken) {
        commit('setIdToken', idToken)
      }
    }
    // dispatch('fetchUser');
  }
}
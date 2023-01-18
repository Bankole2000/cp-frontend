import { errorMessage, loadingMessage, successMessage } from "~/utils/messaging";

export default {
  async getUserProfile({ commit, dispatch, rootState }) {
    const message = loadingMessage({ text: 'Loading...' })
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$get(`${rootState.env.profilePath}/me/profile`);
      if (response.success) {
        await dispatch('ui/updateMessage', { uuid, ...successMessage({ text: 'Loaded' }) }, { root: true })
        commit('setUserProfile', response.data);
      }
      return response;
    } catch (error) {
      console.log(error);
      await dispatch('ui/updateMessage', { uuid, ...errorMessage({ text: error.response ? error.response.data.message : 'Something went wrong' }) }, { root: true })
      return error.response ? error.response.data : error;
    }
  }
}
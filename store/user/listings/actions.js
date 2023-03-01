import { loadingMessage, successMessage, errorMessage } from "~/utils/messaging"

export default {
  async createListing({ commit, dispatch, rootState }, data) {
    const message = loadingMessage({ text: 'Loading...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.listingPath}/listings`, data)
      if (response.success) {
        await dispatch('ui/updateMessage', { uuid, ...successMessage({ text: response.message }) }, { root: true })
        commit('SET_LISTING_DETAILS', response.data);
      }
      return response;
    } catch (error) {
      commit('SET_LISTING_DETAILS', null);
      console.log(error);
      await dispatch('ui/updateMessage', { uuid, ...errorMessage({ text: error.response ? error.response.data.message : 'Something went wrong' }) }, { root: true })
      return error.response ? error.response.data : error;
    }
  }
}
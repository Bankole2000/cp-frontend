// import { errorMessage, infoMessage, loadingMessage } from "~/utils/messaging";

export default {
  async getAllCountryCodes({ commit, rootState, dispatch }) {
    try {
      const response = await this.$axios.$get(`${rootState.env.authPath}/system/data/phone-country-codes`);
      commit("setAllCountryCodes", response.data);
      return response;
    } catch (error) {
      console.log({ error });
      return error.response;
    }
  },
}
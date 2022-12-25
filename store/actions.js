export default {
  // async nuxtServerInit({ commit, dispatch, rootGetters }, { $config, app }) {
  //   commit("setEnv", $config.env);
  //   try {
  //     await dispatch("settings/getAllCountryCodes", null, { root: true });
  //     const data = await app.$axios.$get('https://api.db-ip.com/v2/free/self');
  //     console.log(data);
  //     const result = rootGetters['settings/getCountryByCode'](data.countryCode);
  //     commit('settings/setVisitorData', { ...result, ...data });
  //   } catch (error) {
  //     console.log({ error });
  //     commit('settings/setVisitorData', null);
  //   }
  // }
}
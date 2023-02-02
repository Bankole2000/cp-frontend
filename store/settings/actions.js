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
  async getVisitorGeoData({ commit, rootState, rootGetters }) {
    try {
      // const { ip } = await this.$axios.$get('https://api.ipify.org?format=json');
      const res = await fetch(`https://api.ipify.org?format=json`)
      const { ip } = await res.json();
      const dbResponse = await this.$axios.$get(`${rootState.env.authPath}/system/data/ip-geo-data/${ip}`).catch((error) => {
        console.log({ error });
        return null;
      });
      if (dbResponse) {
        const { geoData } = dbResponse.data;
        commit('setVisitorData', { ip, ...geoData });
        return;
      }
      const ipFindResponse = await this.$axios.$get(`https://api.ipfind.com/?ip=${ip}&auth=${rootState.env.ipFindAPIKey}`).catch((error) => {
        console.log({ error });
        return null;
      })
      if (ipFindResponse) {
        const { country_code: countryCode } = ipFindResponse;
        const country = rootGetters['settings/getCountryByCode'](countryCode);
        commit('setVisitorData', { ip, ...country });
        await this.$axios.$post(`${rootState.env.authPath}/system/data/ip-geo-data`, { ip, geoData: country }).catch((error) => {
          console.log({ error });
        })
        return;
      }
      const ipgeolocResponse = await this.$axios.$get(`https://api.ipgeolocation.io/ipgeo?apiKey=${rootState.env.ipGeoAPIKey}&ip=${ip}`).catch((error) => {
        console.log({ error });
        return null;
      });
      if (ipgeolocResponse) {
        const { country_code2: countryCode } = ipgeolocResponse;
        const country = rootGetters['settings/getCountryByCode'](countryCode);
        commit('settings/setVisitorData', { ip, ...country });
        await this.$axios.$post(`${rootState.env.authPath}/system/data/ip-geo-data`, { ip, geoData: country }).catch((error) => {
          console.log({ error });
        })
        return;
      }
    } catch (error) {
      console.log({ error });
      return error.response;
    }
  }
}
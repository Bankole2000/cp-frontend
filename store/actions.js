export default {
  async nuxtServerInit({ commit, dispatch, rootGetters }, { $config, app, req }) {
    commit("setEnv", $config.env);
    try {
      await dispatch("settings/getAllCountryCodes", null, { root: true });
      const isLoggedIn = rootGetters['auth/isLoggedIn'];
      console.log({ isLoggedIn })
      if (!isLoggedIn) {
        await dispatch("auth/initAuth", req, { root: true });
      }
      //   const { ip } = await app.$axios.$get('https://api.ipify.org?format=json');
      //   console.log({ ip });
      //   // let countryCode, countryName, currency, currencySymbol;
      //   // TODO: get IP address geoData from database;
      //   const dbResponse = await app.$axios.$get(`${$config.env.authPath}/system/data/ip-geo-data/${ip}`).catch((error) => {
      //     console.log({ error });
      //     return null;
      //   });
      //   console.log({ dbResponse });
      //   if (dbResponse) {
      //     const { countryCode } = dbResponse.data.geoData;
      //     const country = rootGetters['settings/getCountryByCode'](countryCode);
      //     commit('settings/setVisitorData', { ip, ...country });
      //     return;
      //   }
      //   const ipFindresponse = await app.$axios.$get(`https://api.ipfind.com/?ip=${ip}&auth=${$config.env.ipFindAPIKey}`).catch((error) => {
      //     console.log({ error });
      //     return null;
      //   })
      //   console.log({ ipFindresponse });
      //   if (ipFindresponse) {
      //     const { country_code: countryCode } = ipFindresponse;
      //     const country = rootGetters['settings/getCountryByCode'](countryCode);
      //     commit('settings/setVisitorData', { ip, ...country });
      //     await app.$axios.$post(`${$config.env.authPath}/system/data/ip-geo-data`, { ip, geoData: country }).catch((error) => {
      //       console.log({ error });
      //     })
      //     return;
      //   }
      //   const ipgeolocResponse = await app.$axios.$get(`https://api.ipgeolocation.io/ipgeo?apiKey=${$config.env.ipGeoAPIKey}&ip=${ip}`).catch((error) => {
      //     console.log({ error });
      //     return null;
      //   });
      //   if (ipgeolocResponse) {
      //     const { country_code2: countryCode } = ipFindresponse;
      //     const country = rootGetters['settings/getCountryByCode'](countryCode);
      //     commit('settings/setVisitorData', { ip, ...country });
      //     await app.$axios.$post(`${$config.env.authPath}/system/data/ip-geo-data`, { ip, geoData: country }).catch((error) => {
      //       console.log({ error });
      //     })
      //     return;
      //   }
      //   // const data = await app.$axios.$get(`https://api.db-ip.com/v2/free/${ip}`);
      //   // const data = await app.$axios.$get('https://api.db-ip.com/v2/free/self');
      //   // console.log(data);
      //   // const result = rootGetters['settings/getCountryByCode'](data.countryCode); 
      //   // commit('settings/setVisitorData', { ...result, ...data });
    } catch (error) {
      console.log({ error });
      commit('settings/setVisitorData', null);
    }
  }
}
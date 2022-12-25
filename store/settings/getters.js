export default {
  allCountryCodes(state) {
    return state.allCountryCodes.map((pcc) => {
      return {
        ...pcc,
        smallFlag: require(`~/assets/img/flags/32x32/${pcc.countryCode.toLowerCase()}.png`),
        largeFlag: require(`~/assets/img/flags/64x64/${pcc.countryCode.toLowerCase()}.png`),
      }
    })
  },
  visitorData(state) {
    return state.visitorData;
  },
  getCountryByCode: (state) => (countryCode) => {
    if (state.allCountryCodes.length && countryCode) {
      return state.allCountryCodes.find(pcc => pcc.countryCode === countryCode);
    }
    return null;
  }
}
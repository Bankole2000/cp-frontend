export default function ({ $axios, store }) {
  $axios.onResponse(async (response) => {
    try {
      if (response.data && response.data.newAccessToken) {
        await store.commit('auth/setAuthToken', response.data.newAccessToken)
        $axios.setToken(response.data.newAccessToken, 'Bearer')
      }
    } catch (error) {
      console.log({ error });
      console.log("Could not update token:", error)
    }
    return response
  })

  $axios.onRequest(config => {
    if (store.state.auth.refreshToken) {
      config.headers.common['x-refresh-token'] = store.state.auth.refreshToken;
    }
    if (store.state.auth.idToken) {
      config.headers.common['x-user-id-token'] = store.state.auth.idToken;
    }
    return config;
  });
}
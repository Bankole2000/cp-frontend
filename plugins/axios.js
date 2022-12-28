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
    console.log({ auth: store.state.auth });
    if (store.state.auth.refreshToken) {
      config.headers.common['x-refresh-token'] = store.state.auth.refreshToken;
    }
    if (store.state.auth.accessToken) {
      $axios.setToken(store.state.auth.authToken, 'Bearer')
    }
    if (store.state.auth.idToken) {
      config.headers.common['x-user-id-token'] = store.state.auth.idToken;
    }
    return config;
  });
}
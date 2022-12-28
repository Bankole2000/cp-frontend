export default async function (context) {
  const isLoggedIn = context.store.getters['auth/isLoggedIn']
  console.log({ isLoggedIn: `[Middleware] checkAuth.js - isLoggedIn - ${isLoggedIn}` })
  if (!isLoggedIn) {
    console.log("[Middleware] checkAuth.js - not Logged In - dispatching initAuth");
    await context.store.dispatch('auth/initAuth', context.req);
  }
  // if (process.client) {

  // context.store.dispatch('auth/initAuth', context.req);
  // }
  // const isLoggedIn = context.store.getters['auth/isLoggedIn']
  // console.log({ isLoggedIn: `[Middleware] requireUser.js - isLoggedIn - ${isLoggedIn}` })
  // if (!context.store.getters['auth/isLoggedIn']) {
  //   return context.redirect('auth/login')
  // }
}
export default async function (context) {
  const isLoggedIn = context.store.getters['auth/isLoggedIn']
  console.log({ isLoggedIn: `[Middleware] checkAuth.js - isLoggedIn - ${isLoggedIn}` })
  if (isLoggedIn) {
    const profile = context.store.getters['user/profile']
    if (!profile) {
      await context.store.dispatch('user/getUserProfile');
    }
  }

}
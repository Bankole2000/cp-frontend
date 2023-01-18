export default function (context) {
  const isLoggedIn = context.store.getters['auth/isLoggedIn']
  console.log({ isLoggedIn: `[Middleware] requireUser.js - isLoggedIn - ${isLoggedIn}` })
  if (!context.store.getters['auth/isLoggedIn']) {
    return context.redirect({ name: 'auth' })
  }
}
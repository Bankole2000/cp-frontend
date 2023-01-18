export default function (context) {
  const idTokenSet = !!context.store.state.auth.idToken;
  console.log({ idTokenSet: `[Middleware] requireIdToken.js - idTokenSet - ${idTokenSet}` })
  if (!idTokenSet) {
    return context.redirect({ name: 'auth' })
  }
}
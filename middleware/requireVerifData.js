export default function (context) {
  const idTokenSet = !!context.store.state.auth.verifData;
  console.log({ idTokenSet: `[Middleware] requireVerifData.js - idTokenSet - ${idTokenSet}` })
  if (!idTokenSet) {
    return context.redirect({ name: 'auth' })
  }
}
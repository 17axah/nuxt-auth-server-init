const ACTION_NAME = 'nuxtAuthServerInit'

function actionDeclared(name, actions) {
  const keys = Object.keys(actions)

  return keys.includes(name)
}

function loginDecorator(fn, context) {
  return async function (...args) {
    const redirect = context.$auth.redirect

    context.$auth.redirect = () => {}

    const result = await fn.apply(this, args).finally(() => {
      context.$auth.redirect = redirect
    })

    if (actionDeclared(ACTION_NAME, context.store._actions)) {
      await context.store.dispatch(ACTION_NAME, context)
    }

    if (context.$auth.options.watchLoggedIn) {
      context.$auth.redirect('home')
    }

    return result
  }
}

export default async function (context) {
  context.$auth.login = loginDecorator(context.$auth.login, context)

  if (
    process.server &&
    context.$auth.loggedIn &&
    actionDeclared(ACTION_NAME, context.store._actions)
  ) {
    await context.store.dispatch(ACTION_NAME, context)
  }
}

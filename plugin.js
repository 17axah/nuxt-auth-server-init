const ACTION_NAME = 'nuxtAuthServerInit'

function actionDeclared(name, actions) {
  const keys = Object.keys(actions)

  return keys.includes(name)
}

function loginDecorator(fn, context) {
  return async function (...args) {
    const result = await fn.apply(this, args)

    if (actionDeclared(ACTION_NAME, context.store._actions)) {
      await context.store.dispatch(ACTION_NAME, context)
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

# nuxt-auth-server-init

[nuxt-auth](https://nuxtjs.org/) plugin that provides the ability to request data only for authorized users.

## Installation

```bash
$ npm install nuxt-auth-server-init
```

```js
// nuxt.config.js
export default {
  modules: [
    'nuxt-auth-server-init',
    '@nuxtjs/auth',
  ],
}
```

## Usage

By analogy with nuxtServerInit, you need to create an action in the store - nuxtAuthServerInit:
```js
// store/index.js
export const actions = {
  async nuxtAuthServerInit(store, context) {
    await store.dispatch('some-action/getData')
  }
}
```

this action will be called on the server side only if the user is logged in ($auth.loggedIn === true), also the action is called after login ($auth.login()).

Thus, we can guaranteed to receive data that is needed only for authorized users.

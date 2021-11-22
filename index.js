import { join } from 'path'

export default function () {
  const { auth } = this.nuxt.options
  const plugin = {
    src: join(__dirname, 'plugin.js')
  }

  if (auth) {
    auth.plugins = auth.plugins ? [...auth.plugins, plugin] : [plugin]
  }

  build.transpile.push('nuxt-auth-server-init')
}

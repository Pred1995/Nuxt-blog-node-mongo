// eslint-disable-next-line no-unused-vars
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
const app = require('./app')

config.dev = !(process.env.NODE_ENV === 'production')

async function start () {
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(nuxt.render)

  app.listen(port, host, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })
}
start()

// const express = require('express')
// const consola = require('consola')
// const { Nuxt, Builder } = require('nuxt')
// const app = express()
// const host = process.env.HOST || '127.0.0.1'
// const port = process.env.PORT || 3000
// const apps = require('./app.js')
// const test = require('./routes/test')
//
// app.set('port', port)
//
// // Import and Set Nuxt.js options
// // eslint-disable-next-line import/order
// const config = require('../nuxt.config.js')
// config.dev = !(process.env.NODE_ENV === 'production')
// module.exports = apps
// app.use(test)
// async function start () {
//   // Init Nuxt.js
//   const nuxt = new Nuxt(config)
//
//   // Build only in dev mode
//   if (config.dev) {
//     const builder = new Builder(nuxt)
//     await builder.build()
//   }
//
//   // Give nuxt middleware to express
//   app.use(nuxt.render)
//
//   // Listen the server
//   app.listen(port, host)
//   consola.ready({
//     message: `Server listening on http://${host}:${port}`,
//     badge: true
//   })
// }
// start()

// // Create express instance
// const app = require('./app.js')
//
// // Require API routes
// const users = require('./routes/users')
// const test = require('./routes/test')
//
// // Import API Routes
// app.use(users)
// app.use(test)
//
// // Export express app
// module.exports = app
//
// // Start standalone server if directly running
// if (require.main === module) {
//   const port = process.env.PORT || 3001
//   app.listen(port, () => {
//     console.log(`API server listening on port ${port}`)
//   })
// }

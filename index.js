const express = require('express')
const router = require('./router')
const config = require('./config')

const app = express()

app.set('x-powered-by', false) // Remove unnecessary header data
app.use(express.json())
app.use(router)

app.listen(config.port, () => {
  /* eslint no-console: "off" */
  console.log('Application listens on %s in %s mode', config.port, process.env.NODE_ENV || 'development')
})

process.on('uncaughtException', (err) => {
  console.log(err)
  process.exit(1)
})

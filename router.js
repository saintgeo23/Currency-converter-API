const express = require('express')
const cache = require('./services/CacheService')

const router = express.Router()

router.get('/', async (req, res) => {
  res.send({ message: 'Hey there! Welcome to Currency Converter API!' })
})

router.get('*', async (req, res) => {
  res.send({ message: 'Nothing\'s here' })
})

module.exports = router

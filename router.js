const express = require('express')
const CacheService = require('./services/CacheService')
const DataService = require('./services/DataService')

const router = express.Router()

router.get('/', (req, res) => {
  res.send({
    message: 'Hey there! Welcome to Currency Converter API!',
  })
})

router.get('/pairs', (req, res) => {
  const currencyPairs = DataService.getCurrencyPairs()

  res.send({ currencyPairs })
})

router.get('/currencies', (req, res) => {
  const currencies = DataService.getCurrencies()

  res.send({ currencies })
})

router.get('/course', (req, res) => {
  const { base, quote } = req.query
  const course = DataService.getCourse(base, quote)

  res.send({ course })
})

router.get('*', (req, res) => {
  res.send({ message: 'Nothing\'s here' })
})

module.exports = router

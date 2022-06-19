/**
 * DataService
 *
 * @module :: Service
 * @description :: Сервис данных для обмена валюты
 */

const CacheService = require("./CacheService")

const CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'KWD',
  'BHD',
  'OMR',
  'JOD',
  'CHF',
  'BMD',
  'BSD',
  'PAB',
]

const COMMISSIONS = [ '1.00', '2.00', '3.00', '4.00', '5.00' ]

const getCommission = function () {
  const max = COMMISSIONS.length
  const index = Math.floor(Math.random() * max)

  return COMMISSIONS[index]
}

const CURRENCY_PAIRS = (function () {
  const pairs = []

  CURRENCIES.forEach((base) => {
    CURRENCIES.forEach((quote) => {
      if (base === quote) return

      pairs.push({
        base_currency: base,
        quote_currency: quote,
        commission: getCommission(),
      })
    })
  })

  return pairs
})()

const CURRENCY_COURSES = (function () {
  const courses = {}

  CURRENCIES.forEach((base) => {
    CURRENCIES.forEach((quote) => {
      if (base === quote) return

      if (courses[`${quote}/${base}`]) {
        courses[`${base}/${quote}`] = 1 / courses[`${quote}/${base}`]
      } else {
        courses[`${base}/${quote}`] = Math.random() * 90 + 10
      }
    })
  })

  return courses
})()

class DataService {
  /**
    * Получить список валют
    */
  getCurrencies () {
    let currencies = CacheService.get('currencies')

    if (!currencies) {
      currencies = JSON.stringify(CURRENCIES)
      CacheService.set('currencies', currencies)
    }

    return JSON.parse(currencies)
  }

  /**
    * Получить пары валют
    */
  getCurrencyPairs () {
    let pairs = CacheService.get('currency_pairs')

    if (!pairs) {
      pairs = JSON.stringify(CURRENCY_PAIRS)
      CacheService.set('currency_pairs', pairs)
    }

    return JSON.parse(pairs)
  }
  /**
    * Получить курс валютной пары
    * @param {string} base :: базовая валюта
    * @param {string} quote :: валюта котировки
    */
  getCourse (base, quote) {
    if (base === undefined || quote === undefined) {
      throw new Error('Необходимо указать корректную пару base/quote')
    }

    const baseCurrency = base.toUpperCase()
    const quoteCurrency = quote.toUpperCase()

    const course = CURRENCY_COURSES[`${baseCurrency}/${quoteCurrency}`]
    if (!course) {
      throw new Error('Необходимо указать корректную пару base/quote')
    }

    return {
      base_currency: baseCurrency,
      quote_currency: quoteCurrency,
      course,
    }
  }
}

module.exports = new DataService()

/**
 * CacheService
 *
 * @module :: Service
 * @description :: Сервис для кеширования данных из API
 * {@link https://www.npmjs.com/package/node-cache}
 */

 const CacheManager = require('node-cache')
 const config = require('../config')

 class Cache {
   constructor(data = {}) {
     this.ttl = data.ttl || config.defaultTTL
     this.manager = new CacheManager({
       stdTTL: this.ttl / 1000,
       checkperiod: data.checkperiod || config.defaultCheckperiod,
     })
   }

   /**
    * Записать значение в кеш
    * @param {string} key :: Ключ
    * @param {string} value :: Значение
    * @param {string} ttl :: Время жизни в секундах
    */
   set(key, value, ttl) {
     if (key === undefined || value === undefined) {
       throw new Error('Необходимо указать корректные параметры {key, value}')
     }

     return this.instance.set(key, value, ttl)
   }

   get(key) {
     if (key === undefined) {
       throw new Error('Необходимо указать ключ')
     }

     return this.instance.get(key)
   }

   del(key) {
     if (key === undefined) {
       throw new Error('Необходимо указать ключ')
     }

     return this.instance.del(key)
   }

   reset() {
     return this.instance.flushAll()
   }

   get instance() {
     return this.manager
   }
 }

 module.exports = new Cache()

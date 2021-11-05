'use strict'

const db = require('./db')
const redis = require('./redis')
const push = require('./push')
const CONFIG_EMAIL = require('./email')
const CONFIG_STORAGE = require('./storage')

module.exports = {
  db,
  redis,
  push,
  TOKEN: {
    secret: process.env.SECRET_TOKEN || 'exampleApplication',
    algorithms: ['HS256']
  },
  CONFIG_EMAIL,
  CONFIG_STORAGE
}

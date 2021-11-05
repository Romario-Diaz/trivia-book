'use strict'

const connect = require('./connect')
const actions = require('./actions')

module.exports = (config) => {
    const s3 = connect(config)
    const services = actions(s3, config.bucket)

    return services
}

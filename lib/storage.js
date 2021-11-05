'use strict'

const storage = require('../aws-storage')
const  CONFIG_STORAGE  = require('../config/storage')

let services = null

module.exports = () => {
    if (!services) {
        try {
            services = storage(CONFIG_STORAGE)
        }catch (error) {
            console.log("there was an error : ", error)
        }
    }

    console.log(services)
    return services
}

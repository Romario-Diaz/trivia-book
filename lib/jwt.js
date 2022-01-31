
'use strict'
const jwt = require('jsonwebtoken')
const moment = require("moment")
const secretPass = require('../config/keys')

function createToken(_id, name) {
    const payload = {
        sub: _id,
        name: name,
        iat: moment().unix()
    }

    const token = jwt.sign(payload, secretPass.jwt.key, {
        expiresIn: '7d'
    })

    if (token) {
        return {
            message: 'Success Authentication',
            token: token
        }
    }else {
        return {
            message: 'Something went wrong!!!'
        }
    }
}   

function decodeToken() {

}


module.exports = {
    createToken,
    decodeToken
}
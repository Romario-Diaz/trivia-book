'use strict'

const AWS = require('aws-sdk')
let s3

const run = function (config) {
    if (!s3) {
        s3 = new AWS.S3({
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
            region: config.region,
            apiVersion: '2016-03-01'
        })
    }
    return s3
}

module.exports = run

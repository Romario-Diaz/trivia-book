'use strict'

const multer = require('multer')
const multerS3 = require('multer-s3')
const uuid = require('uuid')

const { imageFilter } = require('./filters')

const actions = (s3, bucket) => {
    const upload = (destination) => {
        return multer({
            fileFilter: imageFilter,
            storage: multerS3({
                s3: s3,
                acl: 'public-read',
                bucket: bucket,
                ContentType: 'image/jpg',
                metadata: (req, file, cb) => {
                    cb(null, { fieldName: file.fieldname })
                },
                key: (req, file, cb) => {
                    const extension = file.mimetype.split('/')
                    cb(null, destination + '/' + uuid.v4() + '.' + extension[1])
                }
            })
        })
    }

    const remove = (key) => {
        return s3.deleteObject({ Bucket: bucket, Key: key }, (err, data) => {
            if (err) throw err
            return data
        })
    }

    return {
        upload,
        remove
    }
}

module.exports = actions
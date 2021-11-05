const routes = require('express').Router()


const setupStorage = require('../../lib/storage')


const { upload } =  setupStorage()


const { getInitialBooks, getFreeEbooks, getAudioBooks, getPayableBooks, getStuffs, 
        getOneBook, uploadAudioBooks, updateBooks, deleteBooks,
        uploadFreeEbooks, uploadPayableBooks, uploadStuffs, uploadPdf } = require('../controllers/books_show')

routes.route('/getInitialBooks').get(getInitialBooks)

routes.route('/getFreeEbooks').get(getFreeEbooks)

routes.route('/getAudioBooks').get(getAudioBooks)
routes.route('/getPayableBooks').get(getPayableBooks)
routes.route('/getArticles').get(getStuffs)

// images
// const storage = require('../../config/multer')
// const multer = require('multer')
// const uploader = multer({storage})

// routes.post('/uploadPayableBooks', uploader.single('file'), uploadPayableBooks)
// files

routes.get('/getOneBook/:id', getOneBook)
routes.put('/updateBooks/:id', updateBooks)
routes.delete('/deleteBooks/:id', deleteBooks)

routes.post('/uploadAudioBooks', upload('images').single('file'), uploadAudioBooks)

routes.post('/uploadFreeEbooks', upload('images').single('file'), uploadFreeEbooks)
// routes.post('/uploadPayableBooks', uploader.single('file'), uploadPayableBooks)
// routes.post('/uploadStuffs', uploader.single('file'), uploadStuffs)

routes.post('/uploadPdf', upload('files').single('file'), uploadPdf)

module.exports = routes

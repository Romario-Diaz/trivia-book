const routes = require('express').Router()
const setupStorage = require('../../lib/storage')
const { upload } =  setupStorage()


const { getInitialProducts,
    getSpecificCategorie,
    getOneProductData,
    getSugerencesProducts,
    uploadProducts,
    getPrincipalCategorie,
    getPriceCategorie
} = require('../controllers/products_amazon')

// we are here!!!
routes.route('/getInitialProducts').get(getInitialProducts)

routes.route('/getSpecificCategorie').post(getSpecificCategorie)

routes.route('/getSugerencesProducts').get(getSugerencesProducts)

routes.route('/getOneProductData/:id').get(getOneProductData)

routes.route('/uploadProducts').get(uploadProducts)


routes.route('/getPrincipalCategorie').get(getPrincipalCategorie)
routes.route('/getPriceCategorie').get(getPriceCategorie)


// routes.post('/uploadAudioBooks', upload('images').single('file'), uploadAudioBooks)


module.exports = routes

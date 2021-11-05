
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // console.log("entra?", req.body)
        cb(null, path.join(__dirname, '../static/images'))
        // if(req.body.__id) {
        //     cb(null, path.join(__dirname, '../static/files'))
        // }else{
        //     cb(null, path.join(__dirname, '../static/images'))
        // }
       
    },
    filename: function(req, file, cb) {
        cb(null, `image${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
})

module.exports = storage

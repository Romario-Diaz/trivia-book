const imageFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/pdf') {
        cb(null, true)
    }else {
        // cb(new Error('File type invalid!'), false)
        cb(null, true)
    }
}

module.exports = {
    imageFilter
}
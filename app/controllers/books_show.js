const { connection, Factory }= require('../model_factory/query_factory')



async function getInitialBooks (req, res) {
    sql = `call getInitialBooks()`
    const response = await Factory(sql)
    res.json({response})
}

async function getFreeEbooks (req, res) {
    let sql = `select * from ebooksfree`
    const response = await Factory(sql)
    res.json({result : response})
}

async function getAudioBooks (req, res) {
    let sql = `select * from audiobooks`
    const response = await Factory(sql)
    res.json({result : response})
}

async function getPayableBooks (req, res, next) {
    let sql = `select * from ebookspayable`
    const response = await Factory(sql)
    res.json({result : response})
}

async function getStuffs (req, res, next) {
    let sql = `select * from stuffs `
    const response = await Factory(sql)
    res.json({result : response})
}

async function getOneBook (req, res) {
    res.json({message : 'one book!!'})
}

async function uploadAudioBooks (req, res) {
    const { file, body } = req
    console.log(file)

    if(file) {
        let url = `http://localhost:8000/images/${file.filename}`
        let sql = `insert into audiobooks (name, author, url_audiobook_all, url_audiobook_chapters, url_image) values
                    (${connection.escape(body.name)}, ${connection.escape(body.author)}, 
                    ${connection.escape(body.url_all)}, ${connection.escape(body.url_chapters)}, 
                    ${connection.escape(file.location)})`
        const result = await Factory(sql)
        res.json(result)
    }
}

async function uploadFreeEbooks (req, res) {
    const { file, body } = req
    // let aux = 0;
    if(file) {
        // let url = `http://localhost:8000/images/${file.filename}`
        let sql = `call Insert_book_free(${connection.escape(body.name)},${connection.escape(body.author)},
                    ${connection.escape(file.location)} )`
        const result = await Factory(sql)
        console.log("el resultadooo : ", result)
        res.json({last_id : result[0][0]._idEbook})
    }
}

async function uploadPayableBooks (req, res) {
}

async function uploadStuffs (req, res) {
}

async function uploadPdf (req, res) {
    const { file, body } = req
    if(file) {
        // let url = `http://localhost:8000/files/${file.filename}`
        let sql = `update ebooksfree SET url_file="${file.location}" where id="${body.__id}"`
        const result = await Factory(sql)

        res.json({result:result})
    }
}

async function updateBooks (req, res) {
    res.json({message: 'updating book!!!'})
}

async function deleteBooks (req, res) {
    res.json({message: 'deleting book!!!'})
}

module.exports = {
    getInitialBooks,
    getFreeEbooks,
    getAudioBooks,
    getPayableBooks,
    getStuffs,
    getOneBook,
    uploadAudioBooks,
    updateBooks,
    deleteBooks,
    uploadFreeEbooks,
    uploadPayableBooks,
    uploadStuffs,
    uploadPdf
}
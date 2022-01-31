const { connection, Factory } = require('../model_factory/query_factory')



async function getInitialProducts(req, res) {
    console.log("it works!!")
    sql = `call getInitialProducts()`
    const response = await Factory(sql)
    res.json({ response })
}

async function getSpecificCategorie(req, res) {
    const { priCat, priceCat } = req.body

    var sql = '';
    switch (priceCat) {
        case 0:
            sql = `call getSugestions(${connection.escape(priCat)}, 1, 0, 0)`
            break;
        case 1:
            sql = `call getSugestions(0, ${connection.escape(2)}, 0, 20)`
            break;
        case 2:
            sql = `call getSugestions(0, ${connection.escape(2)}, 20, 50)`
            break;
        case 3:
            sql = `call getSugestions(0, ${connection.escape(2)}, 50, 1000)`
            break;
        case 4:
            sql = `call getSugestions(${connection.escape(priCat)}, ${connection.escape(3)}, 0, 20)`
            break;
        case 5:
            sql = `call getSugestions(${connection.escape(priCat)}, ${connection.escape(3)}, 20, 50)`
            break;
        case 6:
            sql = `call getSugestions(${connection.escape(priCat)}, ${connection.escape(3)}, 50, 1000)`
            break;

        default:
            sql = `call getInitialProducts()`
            break;
    }

    const response = await Factory(sql)
    res.json(response)
}

async function getSugerencesProducts(req, res) {
    let sql = `call getSugestions(0, ${connection.escape(0)}, 0, 0)`
    const response = await Factory(sql)
    res.json(response)
}

async function getOneProductData(req, res) {

    const { id } = req.params
    let sql = `select VS_P.*, S.id as seller_id, S.name as seller_name, S.last_name, S.description as seller_description, S.seller_avatar,
            (select count(*) from comments) as num_comments 
            from vst_filter_products VS_P
            inner join seller as S on VS_P.seller_id = S.id where VS_P.id = ${connection.escape(id)};`
    const response = await Factory(sql)
    console.log("la respuesta", response)
    res.json(response)
}

async function uploadProducts(req, res) {
    const { file, body } = req
    console.log(file)

    if (file) {
        let url = `http://localhost:8000/images/${file.filename}`
        let sql = `insert into audiobooks (name, author, url_audiobook_all, url_audiobook_chapters, url_image) values
                    (${connection.escape(body.name)}, ${connection.escape(body.author)}, 
                    ${connection.escape(body.url_all)}, ${connection.escape(body.url_chapters)}, 
                    ${connection.escape(file.location)})`
        const result = await Factory(sql)
        res.json(result)
    }
}


async function getPrincipalCategorie(req, res) {
    let sql = `select * from categorie`
    const result = await Factory(sql)
    res.json(result)
}

async function getPriceCategorie(req, res) {
    let sql = `select * from categorie2`
    const result = await Factory(sql)
    res.json(result)
}


module.exports = {
    getInitialProducts,

    getSpecificCategorie,
    getSugerencesProducts,

    getOneProductData,
    uploadProducts,
    getPrincipalCategorie,
    getPriceCategorie
}
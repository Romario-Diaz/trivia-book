const util = require('util')

const connection = require('../../config/connetion')
const query = util.promisify(connection.query).bind(connection)

async function Factory(sql) {
    try {
        let sql_query = `${sql}`
        const rows = await query(sql_query)
        return rows
    }
    catch(err) {
        return {error : err}
    }
}



module.exports = {
    Factory,
    connection
}
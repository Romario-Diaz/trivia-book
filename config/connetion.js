
const mysql = require('mysql')
const mysql_params = require('./mysql.json')

const ObjectConnection = {
    host: mysql_params.mysql.host, 
    port: mysql_params.mysql.port,
    user: mysql_params.mysql.user,
    password: mysql_params.mysql.pass,
    database: mysql_params.mysql.database
}

const myConn = mysql.createConnection(ObjectConnection)

module.exports = myConn

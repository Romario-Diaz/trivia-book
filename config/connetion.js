
const mysql = require('mysql')
const mysql_params = require('./keys')

// console.log("los datos de la base de ddatos : ", mysql_params)

const ObjectConnection = {
    host: mysql_params.mysql.host, 
    port: mysql_params.mysql.port,
    user: mysql_params.mysql.user,
    password: mysql_params.mysql.pass,
    database: mysql_params.mysql.database
}

const myConn = mysql.createConnection(ObjectConnection)

// myConn.connect(err => {
//     if(err) {
//         console.log(`there was an error while connecting database : ${err}`)
//     }else {
//         console.log(`database is connected as`)
//     }
// })


module.exports = myConn

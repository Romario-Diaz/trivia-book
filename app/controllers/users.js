'use strict'

const bcrypt = require('bcryptjs')
const { connection, Factory } = require('../model_factory/query_factory')
const { createToken } = require('../../lib/jwt')

const { sendOneEmail } = require('../../lib/sendEmail')
const { RDS } = require('aws-sdk')

async function register (req, res) {
    const { name, username, user_password } = await req.body
    const salt = 10

    console.log("los datos : ", name, username, user_password)
    const encrypttedPassword = await bcrypt.hash(user_password, salt)

    console.log(encrypttedPassword)

    let sql = `call signUpIn(${connection.escape(name)}, ${connection.escape(username)},
                 ${connection.escape(encrypttedPassword)}, ${connection.escape(0)})`

    const result = await Factory(sql)

    if (result.error) {
        res.json(result)
    }else {
        console.log("el resultado : ", result)
        const { id, name } = result[0][0]
        res.json(createToken(id, name))
    }
}

async function login (req, res) {
    const { username, user_password } = req.body;
    let name = ''
    let sql = `call signUpIn(${connection.escape(name)},${connection.escape(username)},
                ${connection.escape(user_password)}, ${connection.escape(1)})`
    
    const result = await Factory(sql)

    if(result.error) {
        res.json(result)
    }else {
        console.log("si se ha encontrado al usuario")
        const { id_client, name, password } = result[0][0]
        const truePass = await bcrypt.compare(user_password, password)
        if(truePass) {
            res.json(createToken(id_client, name))
        }else {
            res.json({message: 'la contraseña ingresada es incorrecta!!'})
        }
    }
}

async function sendNewPassword (req, res) {
    const { email } = req.body

    console.log("entra aqui ooooo ? ", req.body)

    let sql = `select id from client where username = ${connection.escape(email)}`
    const result = await Factory(sql)

    if(result.error) {
        res.json({ message: 'lo siento, no pudimos encontrar tu nombre de usuario' })
    }else {

        
        const response = await sendOneEmail(email)
        console.log(response)
        res.json(response)
        // if(response.message) {
        //     res.json({ message: 'Hemos enviado su nueva contraseña a su correo electronico' })
        // }else {
        //     res.json({ message: 'Ha ocurrido un error al momento de enviar su nueva contraseña, vuelva mas tarde' })
        // }
    }
}

async function allUsersCount (req, res) {
    let sql = `select count(*) as num_clients from client`
    const result = await Factory(sql)
    res.json(result)
}

module.exports = {
    register,
    login,
    sendNewPassword,
    allUsersCount
}
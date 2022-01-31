const route = require('express').Router()

const { register, login, sendNewPassword, allUsersCount } = require('../controllers/users')

route.post('/register', register) 

route.post('/login', login)

route.post('/sendNewPassword', sendNewPassword)

route.get('/allUsersCount', allUsersCount)

module.exports = route
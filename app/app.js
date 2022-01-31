const { urlencoded, json } = require('express')
const express = require('express')
const path = require('path')
const cors = require('cors')
const port = process.env.PORT || 8000

// inizializations
const app = express()

// settings
app.set('port', port)

// middlewares
app.use(cors())
app.use(urlencoded({extended : true}))
app.use(json())

// routes
app.use('/books', require('./routes/books_show'))

app.use('/amazon', require('./routes/products_amazon'))

app.use('/user', require('./routes/users'))

// static files
app.use(express.static(path.join(__dirname, '../static')))

module.exports = app



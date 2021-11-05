const app = require('./app/app')

const connection = require('./config/connetion')

connection.connect((err) => {
    if(err) {
        console.log(`there was an error launching database ${err}`)
    }else {
        console.log(`database is connected !!`)
    }
})

app.listen(app.get('port'), (err => {
    if(err) {
        console.log(`there was an error launching the server : ${err}`)
    }else {
        console.log(`server running on port : ${app.get('port')}`)
    }
}))
var nodemailer = require('nodemailer')
var xoauth2 = require('xoauth2')

function RandomPassword () {
    return Math.random() * (10000 - 1000) + 1000;
}

async  function sendOneEmail (email) {
    // var smtpTransport = nodemailer.createTransport("SMTP",{
    //     service: "Gmail",
    //     auth: {
    //         user: "wakaya.inc@gmail.com",
    //         pass: "@Latinvest20"
    //     }
    // });

    smtpTransport = nodemailer.createTransport({
        service: 'smtp.gmail.com',
        auth: {
            user: "wakaya.inc@gmail.com",
                pass: "@Latinvest20"
            // xoauth2: xoauth2.createXOAuth2Generator({
            //     user: "wakaya.inc@gmail.com",
            //     pass: "@Latinvest20"
            // })
        }
    })

    var mailOptions = {
        from: "wakaya.inc@gmail.com",
        to: "romariodiazholgado@gmail.com", 
        subject: "new message !",
        text: "message"
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error)
            return error
        }else{
            console.log("el email ha sido emviado")
            return {message: 'todo good'}
        }
    });
    // let transporter = nodemailer.createTestAccount({
    //     service: 'gmail',
    //     auth: {
    //         user: 'wakaya.inc@gmail.com',
    //         pass: '@Latinvest20'
    //     }
    // })

    // const mailOptions = {
    //     from: 'WAKAYA',
    //     to: email,
    //     subject: 'New Password',
    //     text: `Hola vicuña, vemos que te olvidaste tu contraseña
    //             ahora esta sera tu contraseña : ${RandomPassword()}`
    // }

    // transporter.sendMail(mailOptions, (err, result) => {
    //     if(err) {
    //         console.log("there was an error")
    //         return {error: 'todo bad'}
    //     }else {
    //         return {message: 'todo good'}
    //     }
    // })
}

function sendVariousEmail () {

}

module.exports = {
    sendOneEmail
}
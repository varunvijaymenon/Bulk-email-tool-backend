const express = require('express')
const app = express()
var cors = require('cors')
const nodemailer = require('nodemailer');

app.use(express.json())
app.use(cors())

const port = 4000

EMAIL_ID = "varunvijaymenon@gmail.com"
CLIENT_ID = "357815015826-ska31tqm2k8hj6gv4r2e7dtf1q5dmdda.apps.googleusercontent.com"
CLIENT_SECRET = "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"
REFRESH_TOKEN = "1//040Dsn8UGLwTcCgYIARAAGAQSNwF-L9IrazZP2fSc-8eC2txK-P5A98p69BPVoOwv7ULCYejs9xh4oG8ek61wa4_IDSHZqqPNX9k"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: EMAIL_ID,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN
      }
  });


app.post('/send', function (req, res) {  
    // Prepare output in JSON format  
    
    to_address = req.body.emails
    message = req.body.message
    email_subject = req.body.subject

    console.log(to_address, message)

    const mailConfigurations = {
  
        // It should be a string of sender email
        from: EMAIL_ID,
          
        // Comma Separated list of mails
        to: to_address,
      
        // Subject of Email
        subject: email_subject,
          
        // This would be the text of email body
        text: message
    };


    transporter.sendMail(mailConfigurations, function(error, info){
        if (error) throw Error(error);
        console.log('Email Sent Successfully');
        console.log(info);
    });

 })  


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
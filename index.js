const express = require('express')
const app = express()
var cors = require('cors')
const nodemailer = require('nodemailer');

const dotenv = require('dotenv')
dotenv.config();

app.use(express.json())
app.UseCors(x => x
  .AllowAnyMethod()
  .AllowAnyHeader()
  .SetIsOriginAllowed(origin => true) // allow any origin
  .AllowCredentials()); // allow credentials
  
const port = 4000



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_ID,
        clientId: process.env.CLIENT_ID,
        clientSecret:  process.env.CLIENT_SECRET,
        refreshToken:  process.env.REFRESH_TOKEN
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
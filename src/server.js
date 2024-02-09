import express from 'express';
import path from 'path';
import { config } from 'dotenv';
config({path: '../email.env'});
import { createTransport } from 'nodemailer';

var app = express();

var port = 4000
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("../"));


app.post("/send_email", function(req, response) {
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.comment;

    var transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
            // 'fvwk dzwt znck doyw'
        }
    });

    var mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'pikku388@gmail.com',
        subject: subject,
        text: `Name: ${name}\n E-mail: ${email}\n Message: ${message}`,
        html: `<h2>Name: ${name} <br> E-mail: ${email}<br> Message: ${message}</h2>`
    }

    transporter.sendMail(mailOptions, (error,info) => {
        if(error) {
            console.log(error);
        }
        else {
            console.log("Email send: " + info.response);
            alert("Form was successfully submiteed.");
        }
        response.redirect("/");
    })
})

app.listen(4000, () => {
    console.log(`Server is running on port ${port}`);
})

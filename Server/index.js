const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

// require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

// var myResizeBy = resizeBy; 
app.get('/',()=>{
    resizeBy.send('welcom to my forma')
})

app.post('/api/forma', (req,res)=> {
    let data =req.body
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: 'hasib.skandary@gmail.com',
            pass:'Kabul12345'
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    let mailOptions={
        from:data.email,
        to:'hasib.skandary@gmail.com',
        subject:`Message from ${data.fullName}`,
        html: `
        
        <h3>Information</h3>
        <ul>
        <li>Name: ${data.fullName}</li>
      
        <li>Email: ${data.email}</li>
        </ul>

        <h3>Message</h3>
        <p>${data.message}</p>

        `
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if(error){
            res.send(error)
        } else {
            res.send('Success')
        }
    })

    smtpTransport.close();

})

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log('server starting at port 5000');
    
})

// app.listen(process.env.PORT || 5000,()=>{
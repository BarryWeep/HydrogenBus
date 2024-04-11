const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
// Route to handle POST request
router.post('/send', (req, res) => {

    console.log("asdasdasd-------------------");
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Subject: ${req.body.subject}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'mail.premiertg.com.au', // Replace with your mail provider
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'noreply@premiertg.com.au', // Replace with your email
            pass: 'VpL7v=NLLJVe' // Replace with your password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // Setup email data
    let mailOptions = {
        from: '"Nodemailer Contact" <noreply@premiertg.com.au>', // Sender address
        to: 'enquiries@premierillawarra.com.au', // List of receivers
        subject: 'Node Contact Request', // Subject line
        html: output // HTML body content
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.redirect('/'); // Redirect back to your form page
    });
});

module.exports = router;
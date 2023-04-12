const nodemailer = require('nodemailer')
const config = require('../config');
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.email.id,
        pass: config.email.pass,
    },
});
// Send Email
// res , to , subject , html
const sendEmail = async (res, to_email, subject_to, html_to) => {
    let mailOptions = {
        from: config.email.id,
        to: to_email,
        subject: subject_to,
        html: html_to
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err.message);
            res.status(400).json({ success: false, msg: "Error in Sending mail" })
        } else {
            res.status(200).json({ success: true, msg: "Email Sent Successfully" });
        }
    });
}

module.exports = { sendEmail }
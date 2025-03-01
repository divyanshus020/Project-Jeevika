const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER || "sharmadivyanshu281@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "sopkidnzupcjahbk"
    }
});
console.log("email",process.env.EMAIL_USER);
console.log("passw",process.env.EMAIL_PASSWORD);
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});
const sendEmail = async (options) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.email,
        subject: options.subject,
        html: options.html
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

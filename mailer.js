var mailInfo = require('./mail_info.json')

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(mailInfo.sendgridKey)


function sendMail(mailOptions){
    console.log('sending mail to ' + mailOptions.to)
    sgMail
        .send(mailOptions)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
    })
};


async function sendContactMail(dataString){
    const mailOptions = {
        // siteConfig must be loaded globally in app.js
        to: siteConfig.admin_email,
        from: 'contact@' + mailInfo.domain, 
        subject: 'Contact on ' + mailInfo.domain,
        text: dataString,   // data from contact form

        //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    
    return sendMail(mailOptions);
}

async function notifySubscribers(){

}

module.exports = {sendContactMail,sendMail}
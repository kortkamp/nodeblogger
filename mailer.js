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


async function sendContactMail(contactData){
    const mailOptions = {
        // siteConfig must be loaded globally in app.js
        to: siteConfig.admin_email,
        from: 'contact@' + mailInfo.domain, 
        subject: 'Contact on ' + mailInfo.domain,
        //text: contactData,   // data from contact form

        html:   '<strong>Contact on ' + mailInfo.domain + '</strong><BR>'+
                contactData.name + '<BR>'+
                contactData.email + '<BR>'+
                contactData.phone + '<BR><BR>'+
                contactData.message + '<BR>'

    }
    console.log(contactData);
    return sendMail(mailOptions);
}

async function notifySubscribers(articleId){
    console.log('notifying all subscribers')
}

module.exports = {sendContactMail,sendMail,notifySubscribers}
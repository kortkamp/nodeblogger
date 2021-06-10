var mailInfo = require('./mail_info.json')

const sgMail = require('@sendgrid/mail')

const SubscriberController = require('./database/controllers/SubscriberController');

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


async function notifySubscribers(article){

    console.log(article)

    subscribers = await SubscriberController.getSubscribers()

    const mailOptions = {
        // siteConfig must be loaded globally in app.js
        to: '',
        from: 'no-reply@' + mailInfo.domain, 
        subject: 'New Post on ' + mailInfo.domain,
        //text: contactData,   // data from contact form

        html:   '<h2> A new Article has been posted in '+mailInfo.domain+'</h2><br>'+
                '<br>'+
                '<br>'+
                'Go to <a href="http://' + mailInfo.domain + '">'+ mailInfo.domain + '</a> to read the new article!!'+
                '<br>' +
                '<br>' +
                '<br>' +
                '<br>' +
                'If you dont want to receive new E-mail, please go to ...'

    }
    
    for(subscriber of subscribers){
        console.log(subscriber.email)
        mailOptions.to = subscriber.email
        sendMail(mailOptions);
    }
    console.log('----> notified all subscribers')
}

module.exports = {sendContactMail,sendMail,notifySubscribers}
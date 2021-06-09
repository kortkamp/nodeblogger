const { test } = require('gray-matter');
var nodemailer = require('nodemailer');
var mailInfo = require('./mail_info.json')

const { google } = require('googleapis');
const { OAuth2 } = google.auth;


const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const oauth2Client = new OAuth2(
    mailInfo.clientId,
    mailInfo.clientSecret,
    OAUTH_PLAYGROUND
  );


function sendMail(mailOptions){

    oauth2Client.setCredentials({
        refresh_token: mailInfo.oauth.refresh_token,
      });
    const accessToken = oauth2Client.getAccessToken();


    var transporter = nodemailer.createTransport({
        service: 'gmail',
               
        auth: {
            type: 'OAuth2',
            user: mailInfo.user,
            clientId: mailInfo.oauth.clientId,
            clientSecret: mailInfo.clientSecret,
            refreshToken: mailInfo.refresh_token,
            accessToken: accessToken
        }
    });

    //console.log(mailInfo.user + '----')
    return new Promise((resolve,pError) =>{
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                pError('sendMail error');
            } else {
                console.log('Email sent: ' + info.response);
                resolve('email enviado com sucesso');
            }
        });
    });
};


async function sendContactMail(dataString){
    var mailOptions = {
        from: mailInfo.user,
        to: mailInfo.adminEmail,
        subject: 'kortkamp.org contact',
        text: dataString
    };
    //console.log('send a contact mail')
    return( sendMail(mailOptions));
}
async function sendCommentMail(dataString){
    var mailOptions = {
        from: mailInfo.user,
        to: mailInfo.adminEmail,
        subject: 'kortkamp.org new Commentary',
        text: dataString
    };
    //console.log('send a contact mail')
    return( sendMail(mailOptions));
}

module.exports = {sendContactMail,sendMail}
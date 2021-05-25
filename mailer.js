const { test } = require('gray-matter');
var nodemailer = require('nodemailer');
var mailInfo = require('./mail_info.json')





var mailOptions = {
    from: mailInfo.user,
    to: mailInfo.adminEmail,
    subject: 'kortkamp.org contact',
    text: 'teste texto'
};


function sendMail(mailOptions){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
               
        auth: {
            type: 'OAuth2',
            //type: 'login',
            user: mailInfo.user,
            pass: mailInfo.pass,
            clientId: mailInfo.oauth.clientId,//'788979503564-oqdc4cib9vc35p34hqlv8nb5nducfgkm.apps.googleusercontent.com',
            clientSecret: mailInfo.oauth.clientSecret,//'ZSuYvAjPnPmhlxlqUoPus23R',
            refreshToken: mailInfo.oauth.refresh_token,
            accessToken: mailInfo.oauth.access_token
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
/*exemplo
 return new Promise( resolve => {
        connection.query(queryString, [id], function(err, rows) {
            if (err) {
                //console.log(err)    
                console.log("error in db.getChilds")
                handleDisconnect();
                //throw err
            };
            //console.log('The result is: ', rows);
            
            resolve(rows)
      })
});
*/

async function sendContactMail(dataString){
    var mailOptions = {
        from: mailInfo.user,
        to: mailInfo.adminEmail,
        subject: 'kortkamp.org contact',
        text: dataString
    };
    console.log('send a contact mail')
    return( sendMail(mailOptions));
}

module.exports = {sendContactMail,sendMail}
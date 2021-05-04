let nodemailer = require('nodemailer');

let nodemailerTransporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: String('vamshi1000@gmail.com'),
        pass: String('abcd')
    }
});


exports.sendEmail = function (email, subjectLine, slotDetails, callback) {
    let options = {
        from: String('Vaccine Checker vamshi1000@gmail.com'),
        to: email,
        subject: subjectLine,
        text: 'Vaccine available. Details: \n\n' + slotDetails
    };
    nodemailerTransporter.sendMail(options, (error, info) => {
        if (error) {
            return callback(error);
        }
        callback(error, info);
    });
};

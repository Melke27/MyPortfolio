const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.BREVO_SMTP_USER || '909b33001@smtp-brevo.com',
    pass: process.env.BREVO_SMTP_PASS || 'cZyna8EPjSGwpKtz'
  }
});

transporter.sendMail({
  from: process.env.BREVO_SMTP_USER || '909b33001@smtp-brevo.com',
  to: 'melkamuwako5@gmail.com',
  subject: 'Test Email from Brevo SMTP',
  text: 'This is a test email.'
}, (err, info) => {
  if (err) {
    return console.error('Error:', err);
  }
  console.log('Success:', info);
}); 
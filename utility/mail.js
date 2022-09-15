const env = require('dotenv');
env.config({ path: './config.env' });
const nodemailer = require('nodemailer');
const pug = require('pug');

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = 'mironshohasadov2003@gmail.com';
  }
  transport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  async send(template, subject) {
    //1)Render HTML based on a pug

    const html = pug.renderFile(`${__dirname}/../views/mail/${template}.pug`, {
      name: this.name,
      url: this.url,
      subject: subject,
    });

    //2)Define email options

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: html,
    };

    //3)create Transport and send email
    await this.transport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to my website');
  }
}

module.exports = Email;

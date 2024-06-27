import { createTransport, Transporter, SendMailOptions, SentMessageInfo } from 'nodemailer';

const sendEmail = async (email: string, subject: string, template: string): Promise<SentMessageInfo> => {
   console.log(process.env.SMTP_HOST)
   const transport: Transporter = createTransport({
      service: process.env.SMTP_HOST,
      auth: {
         user: process.env.SMTP_FROM_EMAIL,
         pass: process.env.SMTP_PASSWORD
      }
   });
console.log(transport)
   const mailOptions: SendMailOptions = {
      from: process.env.SMTP_USERNAME,
      to: email,
      subject,
      html: template
   };

   const info: SentMessageInfo = await transport.sendMail(mailOptions);
   console.log(info);
   return info;
};

export default sendEmail;

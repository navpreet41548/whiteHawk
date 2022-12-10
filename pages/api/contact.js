// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Contact from "../../models/Contact";
import dbConnect from "../../utils/dbConnect";
import mail from "@sendgrid/mail";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, subject, message, user } = req.body;

      const form = new Contact({ name, email, subject, message, user });
      const savedForm = await form.save();

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
      });

      var mailOptions = {
        from: "whitehawkform@gmail.com",
        to: "navpreetsingh41548@gmail.com",
        subject: `New Form Submitted by ${name}`,
        text: ` 
        Email:${email}
        Subject:${subject}
        Message:${message}
         `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      //! Sending JSON response
      res.json({
        err: null,
        message: "Form Saved Successfully",
        data: null,
      });
    } catch (err) {
      res.json({ err: err.message, message: null, data: null });
    }
  }
}

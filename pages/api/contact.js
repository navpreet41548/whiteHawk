// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Contact from "../../models/Contact";
import dbConnect from "../../utils/dbConnect";
import mail from "@sendgrid/mail";

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, subject, message, user } = req.body;

      const form = new Contact({ name, email, subject, message, user });
      const savedForm = await form.save();

      mail.setApiKey(process.env.SENDGRID_API_KEY);

      const formData = `
  Name: ${name}rn
  Email: ${email}rn
  Subject: ${subject}rn
  Message: ${message}
`;

      const mailSent = await mail.send({
        to: "navpreetsingh41548@gmail.com",
        from: "whitehawkform@gmail.com",
        subject: "New Form!",
        text: message,
        html: message.replace(/rn/g, "<br>"),
      });

      //! Sending JSON response
      res.json({
        err: null,
        mailSent,
        message: "Form Saved Successfully",
        data: null,
      });
    } catch (err) {
      res.json({ err: err.message, message: null, data: null });
    }
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";
import bcrypt from "bcryptjs";
import { createToken } from "../../../utils/token";
import cookie from "cookie";

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    //! Checking User if Already exists in DB
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.json({ err: "User already exists!", message: null, data: null });
    } else {
      try {
        //! Saving User in Db
        const salt = bcrypt.genSaltSync(10);
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hashSync(password, salt);
        const savedUser = await User.create({ name, email, hashedPassword });

        //! Creating JWT
        const token = await createToken({ userId: savedUser._id });

        //! Setting Cookies
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            maxAge: 60 * 60 * 60 * 60,
            sameSite: "strict",
            path: "/",
          })
        );

        //! Sending JSON response
        res.json({
          err: null,
          message: "User registered Successfully",
          data: savedUser,
        });
      } catch (err) {
        res.json({ err: err.message, message: null, data: null });
      }
    }
  }
}

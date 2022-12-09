// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";
import bcrypt from "bcryptjs";
import { createToken } from "../../../utils/token";
import cookie from "cookie";

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    //! Checking User if Exists in DB
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ err: "User not found!", message: null, data: null });
    } else {
      try {
        //! Checking Password
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
          res.json({
            err: "Wrong Credentials",
            message: null,
            data: null,
          });
        } else {
          //! Creating JWT
          const token = await createToken({ userId: user._id });

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
            message: "User Login Successfully",
            data: user,
          });
        }
      } catch (err) {
        res.json({ err: err.message });
      }
    }
  }
}

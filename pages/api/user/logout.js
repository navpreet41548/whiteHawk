// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";
import cookie from "cookie";

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      //! Setting Cookies
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          maxAge: 1,
          sameSite: "strict",
          path: "/",
        })
      );

      //! Sending JSON response
      res.json({
        err: null,
        message: "User Logout  Successfully",
        data: null,
      });
    } catch (err) {
      res.json({
        err: err,
        message: "Something Went Wrong",
        data: null,
      });
    }
  }
}

import jwt from "jsonwebtoken";
import User from "../../../models/User";

export default async function handler(req, res) {
  try {
    //!Get the token and Check if Exists
    const token = req.headers.token;
    if (!token) {
      res.json({ err: "Sign In first " });
    }

    //!Verify the JWT
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded;

    //!Find the User
    const dbUser = await User.findById(userId);
    if (dbUser) {
      let err = null;
      return res.status(200).json({ data: dbUser, err, message: "User Found" });
    } else {
      return res.json({ err: "Sign In first 1 " });
    }
  } catch (err) {
    console.log(err);
    return res.json({ message: "Sign In first2 ", err: err.message });
  }
}

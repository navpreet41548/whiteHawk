import { verifyToken } from "../utils/token";
import User from "../models/User";
const withProtect = (handler) => {
  return async (req, res) => {
    // const token = req.headers.token;
    const token = req.cookies.token;

    if (!token) {
      return res.json({ Authenticated: false, msg: "First Sign In 1 " });
    }
    const decoded = await verifyToken(token);
    if (!decoded) {
      return res.json({ Authenticated: false, msg: "First Sign In 2" });
    }
    const { userId } = decoded;
    try {
      const user = await User.findById(userId);
      if (user) {
        req.user = user;
        return handler(req, res);
      } else {
        return res.json({ Authenticated: false, msg: "First Sign Again3 " });
      }
    } catch (err) {
      return res.json({ Authenticated: false, msg: "First Sign Again4 " });
    }
  };
};

export default withProtect;

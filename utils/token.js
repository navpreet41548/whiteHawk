import jwt from "jsonwebtoken";
export const createToken = async (payload) => {
  try {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1y",
    });
    return token;
  } catch (err) {
    return { data: null, err };
  }
};

export const verifyToken = async (token) => {
  try {
    let decoded;
    decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    let decoded = false;
    return decoded;
  }
};

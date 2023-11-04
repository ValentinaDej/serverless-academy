import jwt from "jsonwebtoken";
import errorHandler from "./errorHandler.js";

export const generateTokens = (payload) => {
  try {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXP_MS,
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET);

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    return errorHandler(401, error);
  }
};

export const validRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_SECRET);
  } catch (error) {
    return errorHandler(401, error);
  }
};

//  jwt.verify(token, process.env.ACCESS_SECRET, async (err, decoded) => {
//     if (err) {
//       console.log(err);
//       return res.status(401).send(errorMsg);
//     }
//     req.userId = decoded.id;
//     next();
//   });

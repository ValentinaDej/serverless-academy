import jwt from "jsonwebtoken";
import { errorHandler } from "../helpers/error/errorHandler";

export const verifyAccessTokenFromHeaders = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return errorHandler(401);
  }

  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return errorHandler(401);
    }
    next();
  });
};

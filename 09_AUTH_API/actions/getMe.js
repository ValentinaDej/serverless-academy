import jwt from "jsonwebtoken";
import { getCurrentUser } from "../services/userSevice.js";
import { errorHandler } from "../helpers/error/errorHandler.js";

export const getMe = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return errorHandler(401);
    }

    const userId = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET,
      (err, decoded) => {
        if (err) {
          return errorHandler(401);
        }
        return decoded.id;
      }
    );

    try {
      const data = await getCurrentUser(userId);
      const { status, success, result } = data;

      res.status(status).json({
        success,
        ...result,
      });
    } catch (error) {
      return errorHandler(401, error);
    }
  } catch (error) {
    return errorHandler(401, error);
  }
};

//{
// main      |   id: 'eaf2f63b-e8aa-42a3-8593-6e39b029826d',
// main      |   email: 'test@gmail.com',
// main      |   iat: 1699094318
// main      | }

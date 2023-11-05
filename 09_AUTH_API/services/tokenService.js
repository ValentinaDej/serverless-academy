import jwt from "jsonwebtoken";
import errorHandler from "../helpers/errorHandler.js";

class TokenService {
  generateTokens(payload) {
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
  }

  validRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.REFRESH_SECRET);
    } catch (error) {
      return errorHandler(401, error);
    }
  }
}

export default new TokenService();

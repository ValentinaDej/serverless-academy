import * as jwt from "jsonwebtoken";

import { TokensType } from "../types";
import handlerError from "../helpers/handlerError";

class TokenService {
  generateTokens(payload: object): TokensType {
    if (!process.env.ACCESS_KEY) {
      throw new Error("ACCESS_KEY is not defined");
    }

    if (!process.env.REFRESH_KEY) {
      throw new Error("ACCESS_KEY is not defined");
    }

    const accessToken = jwt.sign(payload, process.env.ACCESS_KEY, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY);

    return { accessToken, refreshToken };
  }

  verifyAccessToken(token: string): { email: string } {
    if (!token) {
      handlerError.throwError(401, "Unauthorized");
    }

    try {
      if (!process.env.ACCESS_KEY) {
        throw new Error("ACCESS_KEY is not defined");
      }

      const payload = jwt.verify(token, process.env.ACCESS_KEY) as {
        email: string;
      };
      return payload;
    } catch (error) {
      throw new handlerError(401, "Unauthorized");
    }
  }
}

export default new TokenService();

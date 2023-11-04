import jwt from "jsonwebtoken";
import * as db from "../db.js";

// import { ISignResponse, IValidTokenResponse } from "../models/user-models.js";
// import { QueryResult } from "pg";

export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXP,
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET);

  return {
    accessToken,
    refreshToken,
  };
};

// export const validAccessToken = (
//   token: string
// ): JwtPayload | IValidTokenResponse => {
//   try {
//     return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as
//       | JwtPayload
//       | ISignResponse;
//   } catch (error) {
//     return {
//       success: false,
//       error: "Cant valid jwt access token",
//     };
//   }
// };

// export const validRefreshToken = (
//   token: string
// ): JwtPayload | IValidTokenResponse => {
//   try {
//     return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as
//       | JwtPayload
//       | ISignResponse;
//   } catch (error) {
//     return {
//       success: false,
//       error: "Cant valid jwt refresh token",
//     };
//   }
// };

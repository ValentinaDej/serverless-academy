import bcrypt from "bcryptjs";
import * as db from "../db.js";
import { generateTokens } from "../services/tokenService.js";
import { createTableHandler } from "../helpers/createTableHandler.js";
import { tableExistHandler } from "../helpers/tableExistHandler.js";

export const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  const tableExist = await tableExistHandler("users");
  if (!tableExist) {
    try {
      await createTableHandler("users", [
        "id UUID PRIMARY KEY DEFAULT uuid_generate_v4()",
        "email VARCHAR(255) NOT NULL",
        "password VARCHAR(255) NOT NULL",
        "refresh_token VARCHAR(255)",
      ]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(400).json({
        success: false,
        error:
          "An error occurred while processing your request. Please try again later.",
      });

      return;
    }
  } else {
    const data = await db.query("SELECT * FROM public.users WHERE email = $1", [
      email,
    ]);
    if (data.rows[0]) {
      res.status(409).json({
        success: false,
        error: "User with this email already exists",
      });

      return;
    }
  }

  const client = await db.pool.connect();
  try {
    const hashPassword = bcrypt.hashSync(password, 10);
    await client.query("BEGIN");

    const { rows } = await client.query(
      "INSERT INTO public.users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashPassword]
    );

    const userId = rows[0].id;
    let tokens = generateTokens({ userId, email });

    if (userId && tokens.refreshToken) {
      await client.query(
        "UPDATE public.users SET refresh_token = $2 WHERE id = $1",
        [userId, tokens.refreshToken]
      );
      await client.query("COMMIT");

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        data: {
          id: userId,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      });
    } else {
      await client.query("ROLLBACK");
      res.status(400).json({
        success: false,
        error: "Unable to generate refreshToken",
      });
    }
  } catch (error) {
    console.error("Database error:", error);
    await client.query("ROLLBACK");
    res.status(400).json({
      success: false,
      error:
        "An error occurred while processing your request. Please try again later.",
    });
  } finally {
    client.release();
  }
};

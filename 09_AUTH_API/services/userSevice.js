import bcrypt from "bcryptjs";
import * as db from "../db.js";
import { generateTokens } from "../services/tokenService.js";
import { createTableHandler } from "../helpers/db/createTableHandler.js";
import { tableExistHandler } from "../helpers/db/tableExistHandler.js";
import { recordExistHandler } from "../helpers/db/recordExistHandler.js";
import { errorHandler } from "../helpers/error/errorHandler.js";

const createUserTable = async () => {
  try {
    await createTableHandler("users", [
      "id UUID PRIMARY KEY DEFAULT uuid_generate_v4()",
      "email VARCHAR(255) NOT NULL",
      "password VARCHAR(255) NOT NULL",
      "refresh_token VARCHAR(255)",
    ]);
  } catch (error) {
    return errorHandler(400, error);
  }
};

export const registration = async (email, password) => {
  const tableExist = await tableExistHandler("users");

  if (!tableExist) {
    createUserTable();
  }

  const recordExist = await recordExistHandler("public.users", [
    { name: "email", value: email },
  ]);

  if (recordExist) {
    return errorHandler(409);
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

    if (tokens.refreshToken) {
      await client.query(
        "UPDATE public.users SET refresh_token = $2 WHERE id = $1",
        [userId, tokens.refreshToken]
      );

      await client.query("COMMIT");

      return {
        status: 201,
        success: true,
        result: {
          data: {
            id: userId,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          },
        },
      };
    } else {
      await client.query("ROLLBACK");

      return errorHandler(400, "Unable to generate refreshToken");
    }
  } catch (error) {
    await client.query("ROLLBACK");

    return errorHandler(400, error);
  } finally {
    client.release();
  }
};

export const login = async (email, password) => {
  if (!email || !password) {
    return errorHandler(422);
  }

  const recordExist = await recordExistHandler("public.users", [
    { name: "email", value: email },
  ]);

  if (!recordExist) {
    return errorHandler(404);
  }

  const { id, password: hashPassword } = recordExist;

  const passwordCompared = await bcrypt.compare(password, hashPassword);
  if (!passwordCompared) {
    return errorHandler(401);
  }

  const tokens = generateTokens({ id, email });
  if (!tokens.refreshToken) {
    return errorHandler(400, "Unable to generate refreshToken");
  }

  try {
    await db.query("UPDATE public.users SET refresh_token = $2 WHERE id = $1", [
      id,
      tokens.refreshToken,
    ]);

    return {
      status: 200,
      success: true,
      result: {
        data: {
          id,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      },
    };
  } catch (error) {
    return errorHandler(400, error);
  }
};

export const getCurrentUser = async (id) => {
  if (!id) {
    return errorHandler(401);
  }

  const recordExist = await recordExistHandler("public.users", [
    { name: "id", value: id },
  ]);

  if (!recordExist) {
    return errorHandler(401);
  }

  return {
    status: 200,
    success: true,
    result: {
      data: {
        id,
        email: recordExist.email,
      },
    },
  };
};

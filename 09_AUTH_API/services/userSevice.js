import * as db from "../db.js";
import * as tokenHandler from "../helpers/tokenHandler.js";
import * as passwordHandler from "../helpers/passwordHandler.js";
import createTableHandler from "../helpers/db/createTableHandler.js";
import tableExistHandler from "../helpers/db/tableExistHandler.js";
import recordExistHandler from "../helpers/db/recordExistHandler.js";
import errorHandler from "../helpers/errorHandler.js";

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
  if (!email || !password) {
    return errorHandler(422);
  }

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
    const hashPassword = passwordHandler.hashPassword(password);
    await client.query("BEGIN");

    const { rows } = await client.query(
      "INSERT INTO public.users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashPassword]
    );

    const userId = rows[0].id;
    let tokens = tokenHandler.generateTokens({ userId, email });

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

  const tableExist = await tableExistHandler("users");

  if (!tableExist) {
    return errorHandler(400, "Relation 'public.users' does not exist");
  }

  const recordExist = await recordExistHandler("public.users", [
    { name: "email", value: email },
  ]);

  if (!recordExist) {
    return errorHandler(404);
  }

  const { id, password: hashPassword } = recordExist;

  const passwordCompared = passwordHandler.comparePassword(
    password,
    hashPassword
  );

  if (!passwordCompared) {
    return errorHandler(401);
  }

  const tokens = tokenHandler.generateTokens({ id, email });
  if (!tokens.refreshToken) {
    return errorHandler(401);
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

  const tableExist = await tableExistHandler("users");

  if (!tableExist) {
    return errorHandler(400, "Relation 'public.users' does not exist");
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

export const refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    return errorHandler(401);
  }

  const data = tokenHandler.validRefreshToken(refreshToken);
  if (!data) {
    return errorHandler(401);
  }

  const recordExist = await recordExistHandler("public.users", [
    { name: "refresh_token", value: refreshToken },
    { name: "id", value: data.id },
  ]);

  if (!recordExist) {
    return errorHandler(401);
  }

  const { id, email } = recordExist;

  const tokens = tokenHandler.generateTokens({ id, email });

  if (!tokens.refreshToken) {
    return errorHandler(401);
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

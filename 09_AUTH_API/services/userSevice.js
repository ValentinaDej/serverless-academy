import * as db from "../db.js";
import PasswordService from "./passwordService.js";
import DBSecvice from "./dbSecvice.js";
import TokenService from "./tokenService.js";
import errorHandler from "../helpers/errorHandler.js";

class UserService {
  async #createUserTable() {
    try {
      await DBSecvice.createTable("users", [
        "id UUID PRIMARY KEY DEFAULT uuid_generate_v4()",
        "email VARCHAR(255) NOT NULL",
        "password VARCHAR(255) NOT NULL",
        "refresh_token VARCHAR(255)",
      ]);
    } catch (error) {
      return errorHandler(400, error);
    }
  }

  async registration(email, password) {
    if (!email || !password) {
      return errorHandler(422);
    }

    const tableExist = await DBSecvice.tableExist("users");

    if (!tableExist) {
      this.#createUserTable();
    }

    const recordExist = await DBSecvice.recordExist("public.users", [
      { name: "email", value: email },
    ]);

    if (recordExist) {
      return errorHandler(409);
    }

    const client = await db.pool.connect();
    try {
      const hashPassword = PasswordService.hashPassword(password);
      await client.query("BEGIN");

      const { rows } = await client.query(
        "INSERT INTO public.users (email, password) VALUES ($1, $2) RETURNING *",
        [email, hashPassword]
      );

      const userId = rows[0].id;
      let tokens = TokenService.generateTokens({ userId, email });

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
  }

  async login(email, password) {
    if (!email || !password) {
      return errorHandler(422);
    }

    const tableExist = await DBSecvice.tableExist("users");

    if (!tableExist) {
      return errorHandler(400, "Relation 'public.users' does not exist");
    }

    const recordExist = await DBSecvice.recordExist("public.users", [
      { name: "email", value: email },
    ]);

    if (!recordExist) {
      return errorHandler(404);
    }

    const { id, password: hashPassword } = recordExist;

    const passwordCompared = await PasswordService.comparePassword(
      password,
      hashPassword
    );
    console.log(passwordCompared);

    if (!passwordCompared) {
      return errorHandler(401);
    }

    const tokens = TokenService.generateTokens({ id, email });
    if (!tokens.refreshToken) {
      return errorHandler(401);
    }

    try {
      await db.query(
        "UPDATE public.users SET refresh_token = $2 WHERE id = $1",
        [id, tokens.refreshToken]
      );

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
  }

  async getCurrentUser(id) {
    if (!id) {
      return errorHandler(401);
    }

    const tableExist = await DBSecvice.tableExist("users");

    if (!tableExist) {
      return errorHandler(400, "Relation 'public.users' does not exist");
    }

    const recordExist = await DBSecvice.recordExist("public.users", [
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
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      return errorHandler(401);
    }

    const data = TokenService.validRefreshToken(refreshToken);
    if (!data) {
      return errorHandler(401);
    }

    const recordExist = await DBSecvice.recordExist("public.users", [
      { name: "refresh_token", value: refreshToken },
      { name: "id", value: data.id },
    ]);

    if (!recordExist) {
      return errorHandler(401);
    }

    const { id, email } = recordExist;

    const tokens = TokenService.generateTokens({ id, email });

    if (!tokens.refreshToken) {
      return errorHandler(401);
    }

    try {
      await db.query(
        "UPDATE public.users SET refresh_token = $2 WHERE id = $1",
        [id, tokens.refreshToken]
      );

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
  }
}

export default new UserService();

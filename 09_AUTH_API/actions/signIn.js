import { login } from "../services/userSevice.js";
import { errorHandler } from "../helpers/error/errorHandler.js";

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const data = await login(email, password);
    const { status, success, result } = data;

    if (success) {
      const {
        data: { refreshToken },
      } = result;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });
    }

    res.status(status).json({
      success,
      ...result,
    });
  } catch (error) {
    return errorHandler(400, error);
  }
};

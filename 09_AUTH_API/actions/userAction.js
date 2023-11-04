import * as service from "../services/userSevice.js";
import errorHandler from "../helpers/errorHandler.js";

export const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const data = await service.registration(email, password);
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

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const data = await service.login(email, password);
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

export const getMe = async (req, res, next) => {
  try {
    const data = await service.getCurrentUser(req.userId);
    const { status, success, result } = data;

    res.status(status).json({
      success,
      ...result,
    });
  } catch (error) {
    return errorHandler(401, error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const data = await service.refreshToken(refreshToken);
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
    return errorHandler(401, error);
  }
};

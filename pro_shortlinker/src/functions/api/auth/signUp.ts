import UserService from "../../../services/userService";
import ValidationService from "../../../services/validationService";
import handlerWrapper from "../../../helpers/handlerWrapper";
import handlerError from "../../../helpers/handlerError";

export const handler = handlerWrapper(async (event) => {
  if (!event.body) {
    handlerError.throwError(400, "Bad Request: No body provided");
  }

  const body = JSON.parse(event.body || "{}");

  const { email, password } = body;

  if (!email || !password) {
    handlerError.throwError(400, "Bad Request: Missing email or password");
  }

  ValidationService.isValidEmail(email);
  ValidationService.isValidPassword(password);

  const { accessToken, refreshToken } = await UserService.registration(
    email,
    password
  );

  return {
    statusCode: 201,
    body: JSON.stringify({ accessToken, refreshToken }),
  };
});

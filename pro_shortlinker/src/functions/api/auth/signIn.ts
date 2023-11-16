import UserService from "../../../services/userService";
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

  const data = await UserService.login(email, password);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});

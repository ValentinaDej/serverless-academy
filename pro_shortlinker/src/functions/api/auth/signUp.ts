import UserService from "../../../services/userService";
import handlerWrapper from "../../../helpers/handlerWrapper";

export const handler = handlerWrapper(async (event) => {
  const body = JSON.parse(event.body || "{}");
  const { email, password } = body;

  const { accessToken, refreshToken } = await UserService.registration(
    email,
    password
  );

  return {
    statusCode: 201,
    body: JSON.stringify({ accessToken, refreshToken }),
  };
});

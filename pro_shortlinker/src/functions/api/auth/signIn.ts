import UserService from "../../../services/userService";
import handlerWrapper from "../../../helpers/handlerWrapper";

export const handler = handlerWrapper(async (event) => {
  const body = JSON.parse(event.body || "{}");
  const { email, password } = body;

  const data = await UserService.login(email, password);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});

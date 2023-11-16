import LinkService from "../../../services/linkService";
import handlerWrapper from "../../../helpers/handlerWrapper";

export const handler = handlerWrapper(async (event) => {
  const email = JSON.parse(event?.requestContext?.authorizer?.stringKey);
  const data = await LinkService.getLinksByEmail(email);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});

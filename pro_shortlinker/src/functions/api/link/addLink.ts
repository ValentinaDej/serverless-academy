import LinkService from "../../../services/linkService";
import handlerWrapper from "../../../helpers/handlerWrapper";

export const handler = handlerWrapper(async (event) => {
  const body = JSON.parse(event.body || "{}");
  const { link, expiration_time } = body;
  const email = JSON.parse(event?.requestContext?.authorizer?.stringKey);

  const data = await LinkService.addLink(link, email, expiration_time);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});

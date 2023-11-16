import LinkService from "../../../services/linkService";
import ValidationService from "../../../services/validationService";
import handlerError from "../../../helpers/handlerError";
import handlerWrapper from "../../../helpers/handlerWrapper";

export const handler = handlerWrapper(async (event) => {
  if (!event.body || event.body.trim() === "") {
    handlerError.throwError(400, "Bad Request: No body provided");
  }

  const body = JSON.parse(event.body || "{}");

  const { link, expiration_time } = body;
  if (!link || !expiration_time) {
    handlerError.throwError(
      400,
      "Bad Request: Missing link or expiration_time"
    );
  }
  ValidationService.isValidTime(expiration_time);
  ValidationService.isValidLink(link);

  const email = JSON.parse(event?.requestContext?.authorizer?.stringKey);

  const data = await LinkService.addLink(link, email, expiration_time);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});

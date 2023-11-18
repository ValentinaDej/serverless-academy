import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import LinkService from "../../../services/linkService";
import handlerWrapper from "../../../helpers/handlerWrapper";
import handlerError from "../../../helpers/handlerError";
export const handler = handlerWrapper(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id ?? "";

    if (!id) {
      handlerError.throwError(400, "Bad Request: Missing id in pathParameters");
    }

    if (id.length !== LinkService.SHORT_PATH_LENGTH) {
      handlerError.throwError(
        400,
        "Bad Request: Provide correct pathParameters"
      );
    }

    const email = JSON.parse(event?.requestContext?.authorizer?.stringKey);

    const data = await LinkService.deleteLinks(email, [id]);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }
);

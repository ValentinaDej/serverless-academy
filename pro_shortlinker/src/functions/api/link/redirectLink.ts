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

    const email = JSON.parse(event?.requestContext?.authorizer?.stringKey);
    const data = await LinkService.getLinkById(id, email);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }
);

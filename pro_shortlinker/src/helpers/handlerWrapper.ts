import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import handlerError from "./handlerError";

type HandlerFunction = (
  event: APIGatewayEvent
) => Promise<APIGatewayProxyResult>;

const handlerWrapper = (handlerFunc: HandlerFunction) => {
  return async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
      return await handlerFunc(event);
    } catch (error) {
      if (error instanceof handlerError) {
        return {
          statusCode: error.status,
          body: JSON.stringify({ message: error.message }),
        };
      } else {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: "Internal Server Error" }),
        };
      }
    }
  };
};

export default handlerWrapper;

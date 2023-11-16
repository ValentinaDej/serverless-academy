import { APIGatewayProxyResult } from "aws-lambda";
import TokenService from "../services/tokenService";

const generatePolicy = (
  principalId: any,
  effect: any,
  resource: any,
  data: any
) => {
  const authResponse: any = {
    principalId,
  };

  if (effect && resource) {
    const policyDocument: any = {
      Version: "2012-10-17",
      Statement: [],
    };

    const statement = {
      Action: "execute-api:Invoke",
      Effect: effect,
      Resource: resource,
    };

    policyDocument.Statement[0] = statement;
    authResponse.policyDocument = policyDocument;
  }

  authResponse.context = {
    stringKey: JSON.stringify(data),
  };

  return authResponse;
};

export const handler = async (event: any): Promise<APIGatewayProxyResult> => {
  const clientToken =
    event?.headers?.Authorization || event?.authorizationToken;

  let token = clientToken.startsWith("Bearer")
    ? clientToken.split(" ")[1]
    : clientToken;

  const { email } = TokenService.verifyAccessToken(token);
  const policy = email ? "Allow" : "Deny";

  return generatePolicy("user", policy, event.methodArn, email);
};

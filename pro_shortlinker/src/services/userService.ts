import TokenService from "./tokenService";
import PasswordService from "./passwordService";
import handlerError from "../helpers/handlerError";
import { dynamodb } from "..";
import { TokensType } from "../types";

class UserService {
  private async getUserByEmail(email: string): Promise<any> {
    return await dynamodb
      .get({
        TableName: "Users",
        Key: { email },
      })
      .promise();
  }

  private async addUser(
    email: string,
    hashedPassword: string,
    refreshToken: string
  ): Promise<void> {
    const params = {
      TableName: "Users",
      Item: { email, password: hashedPassword, refreshToken },
    };
    await dynamodb.put(params).promise();
  }

  private async updateUserRefreshToken(
    email: string,
    refreshToken: string
  ): Promise<void> {
    const params = {
      TableName: "Users",
      Key: { email },
      UpdateExpression: "set refreshToken = :rt",
      ExpressionAttributeValues: {
        ":rt": refreshToken,
      },
    };
    await dynamodb.update(params).promise();
  }

  private generateAndReturnTokens(email: string): TokensType {
    const { accessToken, refreshToken } = TokenService.generateTokens({
      email,
    });
    return { accessToken, refreshToken };
  }

  async registration(email: string, password: string): Promise<TokensType> {
    const emailToLower = email.toLowerCase().trim();

    const data = await this.getUserByEmail(emailToLower);

    if (data.Item) {
      handlerError.throwError(409, "User already exists");
    }

    const hashedPassword = PasswordService.hashPassword(password);
    const tokens = this.generateAndReturnTokens(emailToLower);

    await this.addUser(emailToLower, hashedPassword, tokens.refreshToken);

    return tokens;
  }

  async login(email: string, password: string): Promise<TokensType> {
    const emailToLower = email.toLowerCase().trim();

    const data = await this.getUserByEmail(emailToLower);

    if (!data.Item) {
      handlerError.throwError(401, "Incorrect email or password");
    }

    const isEqualPass = await PasswordService.comparePassword(
      password,
      data?.Item?.password
    );

    if (!isEqualPass) {
      handlerError.throwError(401, "Incorrect email or password");
    }

    const tokens = this.generateAndReturnTokens(emailToLower);

    await this.updateUserRefreshToken(emailToLower, tokens.refreshToken);

    return tokens;
  }
}

export default new UserService();

import { dynamodb, sqs } from "../index";
import handlerError from "../helpers/handlerError";
import { EXP_TIME } from "../constants/expirationTime";
import { handler as publisherHandler } from "../functions/api/email/publisher";
import { LinkType } from "../types";

type ExpTimeKey = keyof typeof EXP_TIME;

class LinkService {
  private URL_CHARACTERS =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
  SHORT_PATH_LENGTH = 6;

  private shuffleString = (str: string) => {
    const chars = str.split("");
    for (let i = chars.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join("");
  };

  private generateString = () => {
    const newString = this.shuffleString(this.URL_CHARACTERS);
    return newString.substring(0, this.SHORT_PATH_LENGTH);
  };

  private calculateExpirationTime = (time: string) => {
    if (time === "one-time") {
      return time;
    }

    const currentTime = new Date().getTime();
    const expirationOffset = EXP_TIME[time as ExpTimeKey];

    if (!expirationOffset) {
      throw new Error(`Invalid time value: ${time}`);
    }

    return new Date(currentTime + expirationOffset).toISOString();
  };

  private async findLinkById(id: string, email: string): Promise<any> {
    const checkParams = {
      TableName: "Links",
      Key: { id, email },
    };

    return await dynamodb.get(checkParams).promise();
  }

  private async updateLink(id: string, email: string): Promise<any> {
    const existingLink = await this.findLinkById(id, email);

    if (!existingLink.Item) {
      handlerError.throwError(404, "Not found");
    }

    const updateParams = {
      TableName: "Links",
      Key: { id, email },
      UpdateExpression: "SET #stats = if_not_exists(#stats, :zero) + :one",
      ExpressionAttributeNames: {
        "#stats": "stats",
      },
      ExpressionAttributeValues: {
        ":zero": 0,
        ":one": 1,
      },
      ReturnValues: "ALL_NEW",
    };

    return await dynamodb.update(updateParams).promise();
  }

  async addLink(link: string, email: string, time: string): Promise<LinkType> {
    let id: string;

    do {
      id = this.generateString();
      const existingLink = await this.findLinkById(id, email);
      if (!existingLink.Item) {
        break;
      }
    } while (true);

    const shortLink = process.env.HOST_URL + "/" + id;
    const expirationTime = this.calculateExpirationTime(time);

    const params = {
      TableName: "Links",
      Item: {
        id,
        email,
        original: link,
        short: shortLink,
        expiration_time: expirationTime,
      },
    };

    await dynamodb.put(params).promise();

    return params.Item;
  }

  async deleteLinks(email: string, ids: string[]): Promise<any> {
    await publisherHandler(email, ids);

    const deleteRequests = ids.map((id) => {
      return {
        DeleteRequest: {
          Key: { email, id },
        },
      };
    });

    const deleteParams = {
      RequestItems: {
        Links: deleteRequests,
      },
    };

    await dynamodb.batchWrite(deleteParams).promise();

    return ids.map((id) => ({ id, email }));
  }

  async getLinkById(id: string, email: string) {
    const updatedLink = await this.updateLink(id, email);

    if (!updatedLink.Attributes) {
      handlerError.throwError(404, "Not found");
    }

    const expirationTime = updatedLink.Attributes?.expiration_time;

    if (expirationTime === "one-time") {
      await this.deleteLinks(email, [id]);
      return {
        link: updatedLink.Attributes?.original,
        expiration_time: updatedLink.Attributes?.expiration_time,
      };
    }

    return {
      link: updatedLink.Attributes?.original,
      stats: updatedLink.Attributes?.stats,
      expiration_time: updatedLink.Attributes?.expiration_time,
    };
  }

  async getLinksByEmail(email: string): Promise<LinkType> {
    const data = await dynamodb
      .scan({
        TableName: "Links",
        FilterExpression: "email = :email",
        ExpressionAttributeValues: {
          ":email": email,
        },
      })
      .promise();

    return data?.Items?.map((item) => ({
      id: item.id,
      link: item.original,
      short: item.short,
      expiration_time: item.expiration_time,
    }));
  }

  async getExpiredLinks() {
    const currentTime = new Date();
    const data = await dynamodb.scan({ TableName: "Links" }).promise();

    return data?.Items?.filter((item) => {
      const expirationTime = new Date(item.expiration_time);

      return (
        expirationTime < currentTime && item.expiration_time !== "one-time"
      );
    });
  }
}

export default new LinkService();

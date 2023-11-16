import { sqs } from "../../../index";
import handlerError from "../../../helpers/handlerError";

export const handler = async (recipientEmail: string, linkIds: string[]) => {
  try {
    await sqs
      .sendMessage({
        QueueUrl: process.env.QUEUE_URL || "",
        MessageBody: JSON.stringify({
          linkIds,
          recipientEmail,
        }),
      })
      .promise();
  } catch (error) {
    handlerError.throwError(400, "Something went wrong with SQS");
  }
};

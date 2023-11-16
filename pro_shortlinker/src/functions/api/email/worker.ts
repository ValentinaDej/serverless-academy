import { ses } from "../../../index";
import handlerError from "../../../helpers/handlerError";
import { expirationEmailTemplate } from "../../../constants/expirationEmailTemplate";

export const handler = async (event: any) => {
  const sourceUrl = process.env.SENDER_EMAIL;

  if (!sourceUrl) {
    throw new Error("SENDER_EMAIL is not defined in environment variables.");
  }

  for (const message of event.Records) {
    const bodyData = JSON.parse(message.body);
    const { recipientEmail, linkIds } = bodyData;

    const emailBody = expirationEmailTemplate(linkIds);

    const params = {
      Source: sourceUrl,
      Destination: { ToAddresses: [recipientEmail] },
      Message: {
        Subject: { Data: "Link Expiration Notice" },
        Body: {
          Html: {
            Data: emailBody,
          },
        },
      },
    };

    try {
      await ses.sendEmail(params).promise();
    } catch (error) {
      handlerError.throwError(400, "Error sending email");
    }
  }
};

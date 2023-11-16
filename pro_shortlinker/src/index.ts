import DynamoDB from "aws-sdk/clients/dynamodb";
import SQS from "aws-sdk/clients/sqs";
import SES from "aws-sdk/clients/ses";

const dynamodb = new DynamoDB.DocumentClient();
const sqs = new SQS();
const ses = new SES();

export { dynamodb, sqs, ses };

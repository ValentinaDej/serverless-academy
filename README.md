# Serverless ShortLinker

This is a cloud-based link shortening tool on AWS. It offers link creation and management, along with analytics and link expiration settings.

<br>

**🛠️ Initial Setup:**

1. Install Node.js and npm from [Node.js official website](https://nodejs.org/).
2. Install Serverless Framework: `npm install -g serverless`.
3. Create an AWS account: [AWS signup](https://portal.aws.amazon.com/billing/signup).

<br>

**🔑 AWS Configuration:**

1. Create an IAM User with Administrator Access. Guide: [AWS IAM Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html).
2. Verify email/domain in Amazon SES. Guide: [SES Guide](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-addresses-and-domains.html).

<br>

**📁 Project Setup:**

1. Clone the repository: `git clone <repo-url>` and navigate: `cd <repo-name>`.
2. Create a `.env` file from `env.example` and set `SENDER_EMAIL` to your verified SES email.
3. Open the `serverless.yml` file in your project directory. Note the values of `org` and `app` specified in this file.
4. If needed, execute `npx serverless login` in your terminal to log in to the Serverless Dashboard. This step is necessary if you haven't authenticated with the Serverless Dashboard before.
5. Run `npx serverless dashboard` in your terminal to open the Serverless Dashboard in your web browser.
6. In the Serverless Dashboard, create a new project with a name matching the `app` value from `serverless.yml`.
7. Ensure that the `org` value in your project settings matches the `org` value in the `serverless.yml` file.
8. Configure AWS credentials: `aws configure` using credentials from step 4.

<br>

**🚀 Deployment:**

1. Install project dependencies: `npm i`.
2. Build the project: `npm run build`.
3. Deploy to AWS: `npx sls deploy`.

<br>

**🎉 Conclusion:**

Now project is ready to operate on AWS. You can start testing its API and perform other necessary actions.

## Folder structure

- **`serverless.yml`**: Serverless Framework configuration for AWS resources.

- **`package.json`**: Defines project metadata, dependencies, and scripts for building and deploying the project.

- **`tsconfig.json`**: TypeScript configuration file specifying compiler options and project structure.

- **`openAPI.yml`**: Project API documentation.

- **`/build`**: Compiled files ready for deployment.

- **`/doc`**: Project documentation.

- **`/src`**: Main project directory.
  - **`types/`**: TypeScript type definitions.
  - **`functions/`**: AWS Lambda functions.
  - **`services/`**: Data processing and logic services.
  - **`helpers/`**: Utilities and helper functions.
  - **`constants/`**: Constants and templates.
  - **`index.ts`**: AWS configiration.

## Generating Documentation

Run `npm run doc` to generate documentation for the project.
You can use **`openAPI.yml`** to acquaint yourself with the API and perform testing on platforms such as [SwaggerEditor](https://editor.swagger.io/).


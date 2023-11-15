#🌐 Serverless ShortLinker

Serverless ShortLinker is a cloud-based link shortening tool on AWS. It offers link creation and management, along with analytics and link expiration settings.
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
3. Open `serverless.yml`, note `org` and `app`, login to Serverless Dashboard: `npx serverless login`, and align settings.
4. Configure AWS credentials: `aws configure` using credentials from step 4.
<br>
**🚀 Deployment:**
1. Install project dependencies: `npm i`.
2. Build the project: `npm run build`.
3. Deploy to AWS: `npx sls deploy`.
<br>
**🎉 Conclusion:**
Your project is now operational on AWS. Begin API testing and further actions.

# Serverless ShortLinker

**🌐 Description & Features:**
Serverless ShortLinker is a cloud-based link shortening tool on AWS. It offers link creation and management, along with analytics and link expiration settings.

**🛠️ Setup:**
1. Install Node.js and npm from [Node.js official website](https://nodejs.org/).
2. Install Serverless Framework: `npm install -g serverless`.
3. Create an AWS account: [AWS signup](https://portal.aws.amazon.com/billing/signup).
4. Create an IAM User with Administrator Access. Guide: [AWS IAM Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html).
5. Verify email/domain in Amazon SES. Guide: [SES Guide](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-addresses-and-domains.html).
6. Clone the repository: `git clone <repo-url>` and navigate: `cd <repo-name>`.
7. Create a `.env` file from `env.example` and set `SENDER_EMAIL` to your verified SES email.
8. Open `serverless.yml`, note `org` and `app`, login to Serverless Dashboard: `npx serverless login`, and align settings.
9. Configure AWS credentials: `aws configure` using credentials from step 4.
10. Deploy the project: Install dependencies `npm i`, build `npm run build`, and deploy `npx sls deploy`.

**Conclusion:**
Your project is now operational on AWS. Begin API testing and further actions.

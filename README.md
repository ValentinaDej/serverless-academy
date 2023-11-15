# Serverless ShortLinker

**🌐 Description & Features:**
Serverless ShortLinker is a cloud-based link shortening tool on AWS. It offers link creation and management, along with analytics and link expiration settings.

**🛠️ Setup:**

1. **Node.js & npm**: Install from [Node.js](https://nodejs.org/).
2. **Serverless Framework**: Run `npm install -g serverless`.
3. **AWS Account**: Create at [AWS signup](https://portal.aws.amazon.com/billing/signup).

4. **IAM User**:
   - Log into AWS Console.
   - Create IAM user with `AdministratorAccess`.
   - Download credentials. [AWS IAM Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html).

5. **Amazon SES**:
   - Verify email or domain in SES.
   - For help, visit [SES Guide](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-addresses-and-domains.html).

6. **Clone Repo**: `git clone <repo-url>` then `cd <repo-name>`.

7. **.env File**:
   - Based on `env.example`.
   - Set `SENDER_EMAIL` to your verified SES email.

8. **Serverless Dashboard**:
   - Open `serverless.yml`. Note `org` and `app`.
   - Run `npx serverless login` and `npx serverless dashboard`.
   - Align `app` and `org` in the dashboard with `serverless.yml`.

9. **AWS Credentials**:
   - Configure with `aws configure`.
   - Enter credentials from step 4.

10. **Deploy**:
   - `npm i` for dependencies.
   - `npm run build` to build.
   - `npx sls deploy` to deploy.

**Conclusion:**
Your project is now operational on AWS. Begin API testing and further actions.

# Serverless ShortLinker

**🌐 Description:**
Serverless ShortLinker is a cloud-based link shortening application that leverages the power and flexibility of AWS. Designed to provide a seamless user experience, it offers robust features for link management and analytics.

**🔑 Functions:**

- Creation and management of shortened links.
- Visit statistics and link expiration setting.

**Preparation Steps:**

1. **Install Node.js and npm**:
   - If Node.js and `npm` are not already installed, download them from the [Node.js official website](https://nodejs.org/).
2. **Install Serverless Framework**:
   - If not installed, run `npm install -g serverless` in your terminal to install the Serverless Framework.
3. **Create a New AWS Account**:
   - If you do not have an AWS account, create one by visiting the [AWS account creation page](https://portal.aws.amazon.com/billing/signup).
4. **Create an IAM User and Grant Administrative Privileges**:
   - **Log into AWS Management Console**: Access the console using your AWS account credentials.
   - **Access IAM Dashboard**: Go to IAM (Identity and Access Management) in the AWS console.
   - **Create New IAM User**:
     - In the IAM dashboard, select "Users" and click "Create user".
     - Provide a username.
     - Select "Attach existing policies directly".
     - Find and select the "AdministratorAccess" policy.
   - **Finalize User Creation**:
     - Review the configurations and click "Create user".
   - **Download Credentials**:
     - Once the user is created, click on the user name and select "Create access key".
     - Securely save the generated access key ID and secret access key.
   - For detailed instructions and best practices on creating an IAM user, refer to the [AWS IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html).
5. **Create Verified Identities in Amazon SES**:
   - **Access Amazon SES in AWS Console**:
     - In the AWS Management Console, navigate to the Amazon SES dashboard.
   - **Verify a New Identity**:
     - Choose "Verified identities" and then "Email Addresses" for verifying an email, or "Domains" for a domain verification.
     - Click "Verify a New Identity", enter your email address or domain, and then click "Verify This Identity".
   - **Complete the Verification Process**:
     - For email verification, check your email inbox for a message from Amazon SES and click the verification link within.
     - For domain verification, add the provided TXT records to your domain's DNS settings and wait for Amazon SES to confirm the verification.
   - **Note**: Verified identities are necessary to send emails through Amazon SES.
   - For more detailed steps and information on domain verification, visit the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-addresses-and-domains.html).
6. **Clone the Repository**:
   - Run `git clone <repository-url>` in your terminal, replacing `<repository-url>` with the URL of the repository you want to clone.
   - Move into the cloned directory with `cd <repository-name>`.
7. **Create a .env File Based on env.example**:
   - Create the `.env` file to include your specific configuration values.
   - Ensure to set the `SENDER_EMAIL` variable to the email address verified in step 5 (Amazon SES verified email).
8. **Open serverless.yml and Use Serverless Dashboard**:
   - Open the `serverless.yml` file in your project directory.
   - Note the values of `org` and `app` specified in this file.
   - If needed, execute `npx serverless login` in your terminal to log in to the Serverless Dashboard. This step is necessary if you haven't authenticated with the Serverless Dashboard before.
   - Run `npx serverless dashboard` in your terminal to open the Serverless Dashboard in your web browser.
   - In the Serverless Dashboard, create a new project with a name matching the `app` value from `serverless.yml`.
   - Ensure that the `org` value in your project settings matches the `org` value in the `serverless.yml` file.

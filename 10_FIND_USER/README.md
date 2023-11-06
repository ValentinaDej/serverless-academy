# 10_FIND_USER_COUNTRY_BY_IP

**Getting Started**

1. Clone the repository.
2. Install the required dependencies by running: `npm install`.
3. Create a `.env` file in the project directory and define the necessary environment variables.
4. Start by running: `env $(cat .env | xargs) node index.js`.

**Usage**

1. Look in the console to check the port on which the server is running.
2. Make a GET request to http://localhost:3000.
3. Include the x-forwarded-for header with the desired IP address.
4. The server will respond with the country associated with the provided IP address.

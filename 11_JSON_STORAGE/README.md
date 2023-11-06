# 11_JSON_STORAGE

**Getting Started**

1. Clone the repository.
2. Install the required dependencies by running: `npm install`.
3. Create a `.env` file in the project directory and define the necessary environment variables.
4. Start by running: `env $(cat .env | xargs) node index.js`.

**Usage**

1. Look in the console to check the port on which the server is running.
2. Make a POST request to http://localhost:3000/:fileName to save your data.
3. Provide body in JSON format/
4. Make a GET request to http://localhost:3000/:fileName to get your data.

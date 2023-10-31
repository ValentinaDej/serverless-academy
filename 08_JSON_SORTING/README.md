# 08_JSON_SORTING

**Getting Started**

1. Clone the repository.
2. Start by running: `node index.js`.

**Description**
The script logs the status of each endpoint, indicates where "isDone" property is present and it has "true" or "false" value. It also counts and displays the number of "true" and "false" values present in the responses.

**Test mode**

1. Navigate to the "JSON_SERVER" directory within your project `cd JSON_SERVER`.
2. Install the required dependencies by running: `npm install` to install the [JSON Server](https://www.npmjs.com/package/json-server).
3. Start server by running: `npx json-server --watch db.json`. JSON Server typically runs on port 3000 by default. However, you can check the exact port on which JSON Server is running by looking at the terminal output when you start it.
4. Return to the parent directory by moving up for one level `cd ..`.
5. Check endpointListLocalServer variable at `endpointList.js`. This ia an array with endpoints. You should replace port 3000, to that port on which JSON Server is running for every endpoint.
6. Start test mode by running: `node index.js --test`.

The given mode allows you to test the functionality of the script, even in cases where there is no access to external APIs. This is achieved by setting up a local JSON server that serves as a simulated API with predefined data from a db.json file. The script can interact with this local JSON server during testing, ensuring that testing can be performed independently of external API availability.

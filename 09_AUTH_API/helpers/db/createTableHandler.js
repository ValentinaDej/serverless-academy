import * as db from "../../db.js";

const createTableHandler = async (tableName, fields) => {
  const client = await db.pool.connect();
  try {
    await client.query("BEGIN");
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await client.query(`
            CREATE TABLE IF NOT EXISTS ${tableName} (
            ${fields.join(", ")}
            );
`);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
};

export default createTableHandler;

import * as db from "../db.js";

class DBService {
  async createTable(tableName, fields) {
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
  }

  async recordExist(tableName, searchParams) {
    const queryParams = searchParams.map((param) => param.value);
    const searchConditions = searchParams
      .map((param, index) => {
        return `${param.name} = $${index + 1}`;
      })
      .join(" AND ");

    const query = `SELECT * FROM ${tableName} WHERE ${searchConditions}`;
    const data = await db.query(query, queryParams);

    return data.rows[0];
  }

  async tableExist(tableName) {
    const { rows } = await db.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)",
      [tableName]
    );
    return rows[0].exists;
  }
}

export default new DBService();

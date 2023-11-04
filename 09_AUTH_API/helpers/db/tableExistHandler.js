import * as db from "../../db.js";

export const tableExistHandler = async (tableName) => {
  const { rows } = await db.query(
    "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)",
    [tableName]
  );
  return rows[0].exists;
};

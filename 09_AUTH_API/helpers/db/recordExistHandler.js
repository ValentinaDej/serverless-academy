import * as db from "../../db.js";

export const recordExistHandler = async (tableName, searchParams) => {
  const queryParams = searchParams.map((param) => param.value);
  const searchConditions = searchParams
    .map((param, index) => {
      return `${param.name} = $${index + 1}`;
    })
    .join(" AND ");

  const query = `SELECT * FROM ${tableName} WHERE ${searchConditions}`;
  const data = await db.query(query, queryParams);

  return data.rows[0];
};

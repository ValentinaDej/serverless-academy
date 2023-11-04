import * as db from "../db.js";

export const getMe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM user_schema.users");
    res.send(result.rows[0]);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

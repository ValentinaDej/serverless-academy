import { USER_ERROR_MSG } from "../constants/index.js";

export const errorHandler = (error) => {
  console.log(`${error}`);
  return USER_ERROR_MSG;
};

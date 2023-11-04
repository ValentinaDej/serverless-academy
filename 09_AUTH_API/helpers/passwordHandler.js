import bcrypt from "bcryptjs";

const HASH = 10;

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, HASH);
};

export const comparePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

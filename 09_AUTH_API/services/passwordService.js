import bcrypt from "bcryptjs";

class PasswordService {
  constructor() {
    this.HASH = 10;
  }

  hashPassword(password) {
    return bcrypt.hashSync(password, this.HASH);
  }

  async comparePassword(password, hashPassword) {
    return bcrypt.compare(password, hashPassword);
  }
}

export default new PasswordService();

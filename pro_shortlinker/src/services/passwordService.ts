import { hashSync, compare } from "bcryptjs";

class PasswordService {
  private readonly HASH_ROUNDS: number;
  constructor() {
    this.HASH_ROUNDS = 10;
  }

  hashPassword(password: string): string {
    return hashSync(password, this.HASH_ROUNDS);
  }

  async comparePassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return compare(password, hashPassword);
  }
}

export default new PasswordService();

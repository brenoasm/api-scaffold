import * as bcrypt from 'bcrypt';

export class Encrypt {
  static async hash(value: string, salt = 10): Promise<string> {
    const hashedValue = await bcrypt.hash(value, salt);

    return hashedValue;
  }

  static async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}

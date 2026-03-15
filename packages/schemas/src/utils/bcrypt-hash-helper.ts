import type { HashHelper } from "./hash-helper";
import { hash, compare } from "bcrypt";
export class BcryptHashHelper implements HashHelper {
  async hash(raw: string): Promise<string> {
    return await hash(raw, 12);
  }
  async compare(hash: string, raw: string): Promise<boolean> {
    return compare(raw, hash);
  }
}

import type { FakeHashHelper } from "@fastify-e-commerce/schemas";
import { hash, compare } from "bcrypt";
export class BcryptHashHelper implements FakeHashHelper {
  async hash(raw: string): Promise<string> {
    return await hash(raw, 12);
  }
  async compare(hash: string, raw: string): Promise<boolean> {
    return compare(raw, hash);
  }
}

import type {
  CreateRefreshTokenSchemaType,
  RefreshTokenRepositorySchema,
  RefreshTokenSchemaType,
} from "@fastify-e-commerce/schemas";
import { uuidv7 } from "uuidv7";

export class InMemoryRefreshTokenRepository implements RefreshTokenRepositorySchema {
  public tokens = new Map<string, RefreshTokenSchemaType>();

  async create(
    data: CreateRefreshTokenSchemaType,
  ): Promise<RefreshTokenSchemaType> {
    const id = uuidv7();
    const token: RefreshTokenSchemaType = {
      id,
      ...data,
      revoked: false,
      created_at: new Date(),
    };
    this.tokens.set(id, token);
    return token;
  }

  async findByToken(token: string): Promise<RefreshTokenSchemaType | null> {
    return Array.from(this.tokens.values()).find((t) => t.token === token) || null;
  }

  async revoke(id: string): Promise<void> {
    const token = this.tokens.get(id);
    if (token) {
      token.revoked = true;
      this.tokens.set(id, token);
    }
  }

  async revokeAllForUser(user_id: string): Promise<void> {
    Array.from(this.tokens.values()).forEach((token) => {
      if (token.user_id === user_id) {
        token.revoked = true;
        this.tokens.set(token.id, token);
      }
    });
  }
}

import { type PrismaClient } from "generated/prisma/client";
import {
  RefreshTokenRepositorySchema,
  CreateRefreshTokenSchemaType,
  RefreshTokenSchemaType,
} from "@fastify-e-commerce/schemas";

export class PrismaRefreshTokenRepository
  implements RefreshTokenRepositorySchema {
  constructor(private readonly prisma: PrismaClient) { }

  async create(
    data: CreateRefreshTokenSchemaType,
  ): Promise<RefreshTokenSchemaType> {
    return this.prisma.refreshToken.create({
      data,
    });
  }

  async findByToken(token: string): Promise<RefreshTokenSchemaType | null> {
    return this.prisma.refreshToken.findUnique({
      where: { token },
    });
  }

  async revoke(id: string): Promise<void> {
    await this.prisma.refreshToken.update({
      where: { id },
      data: { revoked: true },
    });
  }

  async revokeAllForUser(user_id: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { user_id },
      data: { revoked: true },
    });
  }
}

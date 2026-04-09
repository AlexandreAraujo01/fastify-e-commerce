export type RefreshTokenSchemaType = {
  id: string;
  token: string;
  user_id: string;
  revoked: boolean;
  expires_at: Date;
  created_at: Date;
};

export type CreateRefreshTokenSchemaType = {
  token: string;
  user_id: string;
  expires_at: Date;
};

export interface RefreshTokenRepositorySchema {
  create(data: CreateRefreshTokenSchemaType): Promise<RefreshTokenSchemaType>;
  findByToken(token: string): Promise<RefreshTokenSchemaType | null>;
  revoke(id: string): Promise<void>;
  revokeAllForUser(user_id: string): Promise<void>;
}

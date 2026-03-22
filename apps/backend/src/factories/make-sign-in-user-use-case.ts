import { prismaInstance, PrismaUserRepository } from "@fastify-e-commerce/db";
import { BcryptHashHelper } from "@fastify-e-commerce/schemas";
import { UserSignInUseCase } from "../use-cases/users/user-sign-in";

export function makeSignInUserUseCase(): UserSignInUseCase {
  const userRepo = new PrismaUserRepository(prismaInstance);
  const hashHelper = new BcryptHashHelper();
  return new UserSignInUseCase(userRepo, hashHelper);
}

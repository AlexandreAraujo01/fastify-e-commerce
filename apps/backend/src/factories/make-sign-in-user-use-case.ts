import { prismaInstance, PrismaUserRepository } from "@fastify-e-commerce/db";
import { UserSignInUseCase } from "../use-cases/users/user-sign-in";
import { BcryptHashHelper } from "lib/bcrypt-hash-helper";

export function makeSignInUserUseCase(): UserSignInUseCase {
  const userRepo = new PrismaUserRepository(prismaInstance);
  const hashHelper = new BcryptHashHelper();
  return new UserSignInUseCase(userRepo, hashHelper);
}

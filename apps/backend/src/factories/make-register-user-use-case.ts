import { prismaInstance, PrismaUserRepository } from "@fastify-e-commerce/db";
import { CreateUserUseCase } from "../use-cases/users/create-user-use-case";
import { BcryptHashHelper } from "../../lib/bcrypt-hash-helper";

export function makeCreateUserUseCase(): CreateUserUseCase {
  const userRepo = new PrismaUserRepository(prismaInstance);
  const hashHelper = new BcryptHashHelper();
  return new CreateUserUseCase(userRepo, hashHelper);
}

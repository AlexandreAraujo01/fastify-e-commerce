import { PrismaClient } from './generated/prisma/client/index.js';

const prisma = new PrismaClient();

async function run() {
  try {
    await prisma.user.findUnique({
      where: { email: "test@example.com" }
    });
    console.log("Success");
  } catch (e: any) {
    console.error("----- FULL ERROR -----");
    console.error(e);
  }
  await prisma.$disconnect();
}

run();

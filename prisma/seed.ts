import { PrismaClient } from "@prisma/client/extension";
import { users } from "./users";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  for (let user of users) {
    await prisma.User.create({
      data: user,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

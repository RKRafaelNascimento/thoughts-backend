import { PrismaClient } from "@prisma/client";
import { Logger } from "@/shared/logger";

const logger = Logger.getInstance();
const prisma = new PrismaClient();

async function main() {
  try {
    logger.info({ msg: "Example seeded successfully!" });
  } catch (error) {
    logger.error({ msg: "Error seeding data:", error });
  } finally {
    await prisma.$disconnect();
  }
}

main();

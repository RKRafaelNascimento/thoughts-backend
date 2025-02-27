import { PrismaClient } from "@prisma/client";
import { Logger } from "@/shared/logger";

const logger = Logger.getInstance();
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$transaction(async (transaction) => {
      await transaction.follow.deleteMany({});
      await transaction.user.deleteMany({});

      await transaction.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'User';`;
      await transaction.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Follow';`;

      await transaction.user.createMany({
        data: [
          { username: "user1" },
          { username: "user2" },
          { username: "user3" },
          { username: "user4" },
          { username: "user5" },
        ],
      });

      const users = await transaction.user.findMany();

      const user1 = users[0];
      const user2 = users[1];
      const user3 = users[2];

      await transaction.follow.createMany({
        data: [
          /**
           *  User 1 Follow all users
           **/
          ...users
            .filter((u) => u.id !== user1.id)
            .map((u) => ({
              followerId: user1.id,
              followedId: u.id,
            })),

          /**
           * User 2 all users
           **/
          ...users
            .filter((u) => u.id !== user2.id)
            .map((u) => ({
              followerId: user2.id,
              followedId: u.id,
            })),

          /**
           * User 3 follow only user 1
           **/
          { followerId: user3.id, followedId: user1.id },
        ],
      });

      logger.info({ msg: "Seeded successfully!" });
    });
  } catch (error) {
    logger.error({ msg: "Error seeding data:", error });
  } finally {
    await prisma.$disconnect();
  }
}

main();

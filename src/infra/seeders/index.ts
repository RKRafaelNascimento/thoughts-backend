import { PrismaClient } from "@prisma/client";
import { Logger } from "@/shared/logger";

const logger = Logger.getInstance();
const prisma = new PrismaClient();

function generateContent(): string {
  const words = [
    "Lorem ipsum dolor sit amet",
    "Consectetur adipiscing elit",
    "Sed do eiusmod tempor incididunt",
    "Ut labore et dolore magna aliqua",
    "Quis nostrud exercitation ullamco",
    "Laboris nisi ut aliquip ex ea commodo",
    "Duis aute irure dolor in reprehenderit",
    "Voluptate velit esse cillum dolore",
    "Eu fugiat nulla pariatur",
    "Excepteur sint occaecat cupidatat non proident",
  ];

  let content = "";
  while (content.length < 200) {
    const word = words[Math.floor(Math.random() * words.length)];
    content += ` ${word}`;
    if (content.length >= 200) {
      return content.substring(0, 200);
    }
  }

  return content;
}

function getSentiment(index: number): "pos" | "neg" | "neutral" {
  const sentiments = ["pos", "neg", "neutral"];
  return sentiments[index % sentiments.length] as "pos" | "neg" | "neutral";
}

async function main() {
  try {
    await prisma.$transaction(async (transaction) => {
      await transaction.follow.deleteMany({});
      await transaction.repost.deleteMany({});
      await transaction.post.deleteMany({});
      await transaction.user.deleteMany({});

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
      const user4 = users[3];

      await transaction.follow.createMany({
        data: [
          ...users
            .filter((u) => u.id !== user1.id)
            .map((u) => ({
              followerId: user1.id,
              followedId: u.id,
            })),
          ...users
            .filter((u) => u.id !== user2.id)
            .map((u) => ({
              followerId: user2.id,
              followedId: u.id,
            })),
          { followerId: user3.id, followedId: user1.id },
        ],
      });

      await transaction.post.createMany({
        data: [
          ...Array.from({ length: 5 }).map((_, index) => ({
            userId: user3.id,
            content: generateContent(),
            sentiment: getSentiment(index),
          })),
          ...Array.from({ length: 4 }).map((_, index) => ({
            userId: user4.id,
            content: generateContent(),
            sentiment: getSentiment(index),
          })),
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

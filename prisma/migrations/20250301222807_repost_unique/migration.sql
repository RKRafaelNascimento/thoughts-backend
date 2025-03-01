/*
  Warnings:

  - A unique constraint covering the columns `[userId,originalPostId]` on the table `Repost` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Repost_userId_originalPostId_key" ON "Repost"("userId", "originalPostId");

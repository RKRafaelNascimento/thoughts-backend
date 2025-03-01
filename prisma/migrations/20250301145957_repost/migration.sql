-- CreateTable
CREATE TABLE "Repost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "originalPostId" INTEGER NOT NULL,
    "content" TEXT,
    "sentiment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Repost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Repost_originalPostId_fkey" FOREIGN KEY ("originalPostId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

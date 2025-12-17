-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_writerId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_boardId_fkey";

-- Rename Table Board -> Post
ALTER TABLE "Board" RENAME TO "Post";

-- Rename Constraint manually (optional but good for consistency)
ALTER TABLE "Post" RENAME CONSTRAINT "Board_pkey" TO "Post_pkey";

-- Rename Column boardId -> postId in Comment table
ALTER TABLE "Comment" RENAME COLUMN "boardId" TO "postId";

-- Rename Index (if exists)
ALTER INDEX "Comment_boardId_idx" RENAME TO "Comment_postId_idx";

-- CreateIndex (for Post)
CREATE INDEX "Post_writerId_idx" ON "Post"("writerId");
CREATE INDEX "Post_createdAt_idx" ON "Post"("createdAt");

-- AddForeignKey (Post -> User)
ALTER TABLE "Post" ADD CONSTRAINT "Post_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey (Comment -> Post)
-- Note: Comment_writerId_fkey doesn't change, but we ensure postId points to Post(id)
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

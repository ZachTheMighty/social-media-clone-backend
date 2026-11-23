/*
  Warnings:

  - You are about to drop the column `dislikes` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_post_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "dislikes",
DROP COLUMN "likes";

-- AlterTable
ALTER TABLE "votes" ADD COLUMN     "comment_id" INTEGER,
ALTER COLUMN "post_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

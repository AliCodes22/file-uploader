/*
  Warnings:

  - You are about to drop the column `storedName` on the `File` table. All the data in the column will be lost.
  - Added the required column `path` to the `File` table without a default value. This is not possible if the table is not empty.
  - Made the column `folderId` on table `File` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_folderId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "storedName",
ADD COLUMN     "path" TEXT NOT NULL,
ALTER COLUMN "folderId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

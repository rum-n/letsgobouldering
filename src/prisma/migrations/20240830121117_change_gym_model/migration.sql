/*
  Warnings:

  - You are about to drop the column `location` on the `Gym` table. All the data in the column will be lost.
  - Added the required column `address` to the `Gym` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Gym` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Gym` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Gym" DROP CONSTRAINT "Gym_adminId_fkey";

-- AlterTable
ALTER TABLE "Gym" DROP COLUMN "location",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "adminId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Gym" ADD CONSTRAINT "Gym_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

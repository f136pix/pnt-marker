/*
  Warnings:

  - You are about to drop the column `launchTime` on the `RegisteredTime` table. All the data in the column will be lost.
  - Added the required column `launchTimeEnd` to the `RegisteredTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `launchTimeMade` to the `RegisteredTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `launchTimeStart` to the `RegisteredTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RegisteredTime" DROP COLUMN "launchTime",
ADD COLUMN     "launchTimeEnd" TEXT NOT NULL,
ADD COLUMN     "launchTimeMade" TEXT NOT NULL,
ADD COLUMN     "launchTimeStart" TEXT NOT NULL;

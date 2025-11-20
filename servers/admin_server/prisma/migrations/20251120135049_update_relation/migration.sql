/*
  Warnings:

  - You are about to drop the column `managerId` on the `announcements` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "announcements" DROP CONSTRAINT "announcements_managerId_fkey";

-- AlterTable
ALTER TABLE "announcements" DROP COLUMN "managerId";

-- CreateEnum
CREATE TYPE "announcements_type" AS ENUM ('ANNOUNCEMENT', 'EVENT', 'SERVICE_GUIDE', 'ETC');

-- CreateEnum
CREATE TYPE "frequently_asked_questions_type" AS ENUM ('USAGE_POLICY', 'COMMON', 'PURCHASE', 'SALE');

-- CreateEnum
CREATE TYPE "quality_standards_type" AS ENUM ('SHOES', 'CLOTHES', 'FASHION_ACCESSORIES', 'TECH', 'COLLECTABLE', 'PREMIUM_BAG', 'PREMIUM_WATCH');

-- CreateTable
CREATE TABLE "managers" (
    "id" SERIAL NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "email" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "department" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "deletedAt" TIMESTAMP(6),

    CONSTRAINT "managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "canHandleBoard" BOOLEAN NOT NULL DEFAULT false,
    "canHandleProduct" BOOLEAN NOT NULL DEFAULT false,
    "canHandleUser" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "black_list" (
    "id" SERIAL NOT NULL,
    "managerId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "black_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "announcements" (
    "id" SERIAL NOT NULL,
    "managerId" INTEGER NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" TEXT NOT NULL,
    "type" "announcements_type" NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "deletedAt" TIMESTAMP(6),

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frequently_asked_questions" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" TEXT NOT NULL,
    "type" "frequently_asked_questions_type" NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "deletedAt" TIMESTAMP(6),

    CONSTRAINT "frequently_asked_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quality_standards" (
    "id" SERIAL NOT NULL,
    "managerId" INTEGER NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" TEXT NOT NULL,
    "type" "quality_standards_type" NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "deletedAt" TIMESTAMP(6),

    CONSTRAINT "quality_standards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "managers_email_key" ON "managers"("email");

-- AddForeignKey
ALTER TABLE "managers" ADD CONSTRAINT "managers_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "black_list" ADD CONSTRAINT "black_list_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "managers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "managers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

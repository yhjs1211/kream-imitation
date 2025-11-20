-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('TRADE', 'BID', 'STORE_SALE', 'INTEREST', 'BENEFIT', 'ETC');

-- CreateTable
CREATE TABLE "failed_notifications" (
    "id" SERIAL NOT NULL,
    "referenceSubject" VARCHAR NOT NULL,
    "userId" INTEGER NOT NULL,
    "reason" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "failed_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "references" (
    "id" SERIAL NOT NULL,
    "subject" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "references_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "references_subject_key" ON "references"("subject");

-- AddForeignKey
ALTER TABLE "failed_notifications" ADD CONSTRAINT "failed_notifications_referenceSubject_fkey" FOREIGN KEY ("referenceSubject") REFERENCES "references"("subject") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- CreateEnum
CREATE TYPE "CardCompany" AS ENUM ('SHINHAN', 'SAMSUNG', 'KB', 'HYUNDAI', 'LOTTE', 'WOORIE', 'HANA', 'BC', 'NH');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('경기도', '강원도', '충청남도', '충청북도', '전라남도', '전라북도', '경상남도', '경상북도', '제주도', '서울', '부산', '인천', '대구', '광주', '대전', '울산');

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bankName" VARCHAR NOT NULL,
    "accountNumber" VARCHAR NOT NULL,
    "ownerName" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "postNumber" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "addressDetail" VARCHAR NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR,
    "name" VARCHAR NOT NULL,
    "discountRate" INTEGER NOT NULL,
    "minimumOrderAmount" INTEGER,
    "maximumDiscountAmount" INTEGER,
    "hasExcludedItem" BOOLEAN NOT NULL DEFAULT true,
    "isForBrandDelivery" BOOLEAN NOT NULL DEFAULT true,
    "isExposed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "expirationDate" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interest_brand" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,

    CONSTRAINT "interest_brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interest_products" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "interest_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_cards" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "cardCompany" "CardCompany" NOT NULL,
    "number" VARCHAR NOT NULL,
    "expirationDate" DATE NOT NULL,
    "password" VARCHAR NOT NULL,
    "ownerBirthDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "profileName" VARCHAR NOT NULL,
    "mobile" VARCHAR,
    "profileImageUrl" VARCHAR,
    "introduction" TEXT,
    "height" INTEGER,
    "weight" INTEGER,
    "shoeSize" INTEGER,
    "outerSize" INTEGER,
    "topSize" INTEGER,
    "bottomSize" INTEGER,
    "agreeUsePersonalInfo" BOOLEAN NOT NULL DEFAULT false,
    "agreeGetNotiAsSms" BOOLEAN NOT NULL DEFAULT false,
    "agreeGetNotiAsEmail" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "region" (
    "id" SERIAL NOT NULL,
    "state" "State" NOT NULL,
    "siGun" VARCHAR,
    "gu" VARCHAR,

    CONSTRAINT "region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_coupons" (
    "userId" INTEGER NOT NULL,
    "couponId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMP(6),

    CONSTRAINT "user_coupons_pkey" PRIMARY KEY ("userId","couponId")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "isInactive" BOOLEAN NOT NULL DEFAULT false,
    "isInBlackList" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "withdrewAt" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_userId_key" ON "accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "coupons_code_key" ON "coupons"("code");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interest_brand" ADD CONSTRAINT "interest_brand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interest_products" ADD CONSTRAINT "interest_products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_cards" ADD CONSTRAINT "payment_cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_coupons" ADD CONSTRAINT "user_coupons_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_coupons" ADD CONSTRAINT "user_coupons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

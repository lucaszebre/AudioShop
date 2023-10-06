-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "img" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "imgMobile" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "imgTablet" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'customer';

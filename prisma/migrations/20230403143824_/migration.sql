/*
  Warnings:

  - Added the required column `reference` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Travel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Travel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "reference" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Travel" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "duration_in_minutes" SET DATA TYPE DOUBLE PRECISION;

/*
  Warnings:

  - You are about to drop the column `forma_pago` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `destino` on the `Travel` table. All the data in the column will be lost.
  - You are about to drop the column `distancia_km` on the `Travel` table. All the data in the column will be lost.
  - You are about to drop the column `duracion_min` on the `Travel` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Travel` table. All the data in the column will be lost.
  - You are about to drop the column `origen` on the `Travel` table. All the data in the column will be lost.
  - You are about to drop the column `apellido` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Tarjeta` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `form_payment` to the `Rider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Travel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination` to the `Travel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `distance_in_km` to the `Travel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration_in_minutes` to the `Travel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `Travel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FormPayment" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD');

-- DropForeignKey
ALTER TABLE "Tarjeta" DROP CONSTRAINT "Tarjeta_rider_id_fkey";

-- AlterTable
ALTER TABLE "Rider" DROP COLUMN "forma_pago",
ADD COLUMN     "form_payment" "FormPayment" NOT NULL;

-- AlterTable
ALTER TABLE "Travel" DROP COLUMN "destino",
DROP COLUMN "distancia_km",
DROP COLUMN "duracion_min",
DROP COLUMN "fecha",
DROP COLUMN "origen",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "distance_in_km" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "duration_in_minutes" INTEGER NOT NULL,
ADD COLUMN     "origin" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "apellido",
DROP COLUMN "nombre",
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Tarjeta";

-- DropEnum
DROP TYPE "FormaPago";

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "card_type" TEXT NOT NULL,
    "last_digits" TEXT NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "token_card" TEXT NOT NULL,
    "token_expiration" TIMESTAMP(3) NOT NULL,
    "payload" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "rider_id" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_rider_id_fkey" FOREIGN KEY ("rider_id") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

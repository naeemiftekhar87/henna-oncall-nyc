/*
  Warnings:

  - You are about to drop the column `distanceFee` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "distanceFee",
ADD COLUMN     "travelFee" DOUBLE PRECISION;

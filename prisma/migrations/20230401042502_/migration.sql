-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "travel_id" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_travel_id_key" ON "Payment"("travel_id");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_travel_id_fkey" FOREIGN KEY ("travel_id") REFERENCES "Travel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

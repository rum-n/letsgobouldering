/*
  Warnings:

  - A unique constraint covering the columns `[name,address]` on the table `Gym` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Gym_name_address_key" ON "Gym"("name", "address");

/*
  Warnings:

  - A unique constraint covering the columns `[itemName,restaurantId]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,platformId]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Menu_itemName_restaurantId_key" ON "Menu"("itemName", "restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_name_platformId_key" ON "Restaurant"("name", "platformId");

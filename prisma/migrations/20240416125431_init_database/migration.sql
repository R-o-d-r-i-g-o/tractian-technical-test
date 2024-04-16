-- CreateTable
CREATE TABLE "tb_units" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tb_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_assets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "sensorType" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "unitId" TEXT,

    CONSTRAINT "tb_assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_units_name_key" ON "tb_units"("name");

-- AddForeignKey
ALTER TABLE "tb_assets" ADD CONSTRAINT "tb_assets_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "tb_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

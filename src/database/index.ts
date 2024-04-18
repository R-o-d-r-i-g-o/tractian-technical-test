import { PrismaClient, asset } from '@prisma/client';
import { Filters } from './entity'

const isProduction =  process.env.NODE_ENV == 'production'

// Note: disable logs to don't waste time in debug processing whenever its production.
const prisma = new PrismaClient({
  log: isProduction ? [] : ['query', 'info', 'warn', 'error']
});

const getAssets = async (f: Filters) => {
  await prisma.$connect();
  const unit = await prisma.unit.findFirst({ where: { name: f.unitKey }})

  const assets = await prisma.$queryRaw<Array<asset>>`
    SELECT a."id", a."name", a."locationId", a."parentId", a."status", a."sensorType", a."type", a."unitId"
    FROM tb_assets a
    WHERE a."unitId" = ${unit!.id}
    AND (
      CASE
        WHEN COALESCE(${f.code}, '') <> '' THEN a."parentId" = ${f.code} OR a."locationId" = ${f.code}
        ELSE a."parentId" IS NULL AND a."locationId" IS NULL
      END
    )
    ORDER BY a."type" DESC
    OFFSET ${(f.page - 1) * f.size} ROWS
    FETCH NEXT ${f.size} ROWS ONLY
  `;

  const count = await prisma.$queryRaw<{ total?: number }>`
    SELECT CAST(COUNT(1) AS INTEGER) AS total
    FROM tb_assets a
    WHERE a."unitId" = ${unit!.id}
    AND (
      CASE
        WHEN COALESCE(${f.code}, '') <> '' THEN a."parentId" = ${f.code} OR a."locationId" = ${f.code}
        ELSE a."parentId" IS NULL OR a."locationId" IS NULL
      END
    )
  `;

  await prisma.$disconnect();
  return { assets, total: count.total ?? 0 }
}

const getAssetsBySearch = async (search: string, unitKey: string) => {
  await prisma.$connect();
  const unit = await prisma.unit.findFirst({ where: { name: unitKey }})

  const assets = await prisma.$queryRaw<Array<asset>>`
    WITH RECURSIVE  parents AS (
      SELECT DISTINCT "parentId"
      FROM tb_assets
      WHERE "unitId" = ${unit!.id}
        AND "name" ILIKE CONCAT('%', ${search}, '%')
    ),

    asset_hierarchy AS (
      SELECT "id", "name", "locationId", "parentId", "status", "sensorType", "type", "unitId"
      FROM tb_assets
      WHERE "parentId" IN (SELECT "parentId" FROM parents)

      UNION

      SELECT a."id", a."name", a."locationId", a."parentId", a."status", a."sensorType", a."type", a."unitId"
      FROM tb_assets a
      INNER JOIN asset_hierarchy ah ON ah."parentId" = a."id"
    ) select * from asset_hierarchy
  `;

  await prisma.$disconnect();
  return { assets, total: assets.length }
}

export { getAssets, getAssetsBySearch }
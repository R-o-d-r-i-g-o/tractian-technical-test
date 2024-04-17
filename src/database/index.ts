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
        WHEN COALESCE(${f.code}, '') <> '' THEN a."parentId" = ${f.code}
        ELSE a."parentId" IS NULL
      END
    )
    ORDER BY a."type" DESC
    OFFSET ${(f.page - 1) * f.size} ROWS
    FETCH NEXT ${f.size} ROWS ONLY
  `;

  const total = await prisma.$queryRaw<bigint | null>`
    SELECT COUNT(1)
    FROM tb_assets a
    WHERE a."unitId" = ${unit!.id}
    AND (
      CASE
        WHEN COALESCE(${f.code}, '') <> '' THEN a."parentId" = ${f.code}
        ELSE a."parentId" IS NULL
      END
    )
  `;

  await prisma.$disconnect();
  return { assets, total: Number(total) ?? 0 }
}

export { getAssets }
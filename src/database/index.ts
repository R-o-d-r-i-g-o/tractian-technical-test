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

  const predicate = {
    unitId: unit ? unit.id : undefined,
    parentId: f.code.length > 1 ? f.code : null
  }

  const assets = await prisma.asset.findMany({
    skip: (f.page - 1) * f.size,
    take: f.size,
    orderBy: [{ type: 'desc' }],
    where: predicate,
  })

  const total = await prisma.asset.count({ where: predicate });

  await prisma.$disconnect();
  return { assets, total }
}

export { getAssets }
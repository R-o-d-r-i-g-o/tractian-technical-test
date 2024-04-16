import { PrismaClient, asset } from '@prisma/client';
import { Filters } from './entity'

const isProduction =  process.env.NODE_ENV == 'production'

const prisma = new PrismaClient({
  log: isProduction ? [] : ['query', 'info', 'warn', 'error']
});

const getAssets = async (f: Filters) => {
  await prisma.$connect();
  const assets = await prisma.asset.findMany({
    skip: (f.page - 1) * f.size,
    take: f.size,
    orderBy: [{ name: 'asc' }]
  })

  const total = await prisma.asset.count();

  await prisma.$disconnect();
  return { assets, total }
}

export { getAssets }
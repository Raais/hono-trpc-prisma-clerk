import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  const client = new PrismaClient();
  return client;
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

try {
  // @ts-ignore
  const test = await prisma.$queryRaw`SELECT 1`;
  // @ts-ignore
  if (test?.length > 0) {
    console.log('Prisma Client initialized');
  }
} catch (e) {
  console.error('Error initializing Prisma Client:');
}

//if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
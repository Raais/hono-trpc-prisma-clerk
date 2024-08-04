import { Context } from 'hono'
import { getAuth } from '@hono/clerk-auth'
import { ClerkClient } from '@clerk/backend'
import { type inferAsyncReturnType } from '@trpc/server'
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { prisma } from './db'
import { building } from '../../export/builder/switch'

export const createTRPCHonoContext = async (_c: FetchCreateContextFnOptions, c: Context) => {
    const db = prisma
    const auth = getAuth(c)
    const clerk = c.get('clerk') as ClerkClient

    let user;

    if (auth?.userId) {
        user = await clerk.users.getUser(auth.userId);
    }

    return {
      hono: c,
      user,
      db,
    }
}

export type TRPCHonoContext = building extends true ? any : inferAsyncReturnType<typeof createTRPCHonoContext>;
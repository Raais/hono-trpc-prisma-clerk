import { initTRPC, TRPCError } from '@trpc/server';
import { TRPCHonoContext } from './context';

export const t = initTRPC.context<TRPCHonoContext>().create();
export const router = t.router;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async function (opts) {
    const { ctx } = opts;
    if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return opts.next({
        ctx: {
            user: ctx.user,
        }
    })
})
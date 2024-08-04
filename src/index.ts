import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { trpcServer } from '@hono/trpc-server'
import { appRouter } from './router'
import { renderTrpcPanel } from '@metamorph/trpc-panel'
import { clerkMiddleware } from '@hono/clerk-auth'
import { createTRPCHonoContext } from './lib/context'

const app = new Hono()

app.use(cors({
  origin: '*',
  credentials: true,
}))

app.use('*', clerkMiddleware())

/* Used by client */
app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    createContext: createTRPCHonoContext,
  }),
)

/* Used by client - development */
app.get('/trpci', async (c) => {
  const dts = await Bun.file("./export/dist/index.d.mts").text();
  const mjs = await Bun.file("./export/dist/index.mjs").text();
  return c.json({dts: btoa(dts), mjs: btoa(mjs)});
})

/* Optional */
app.get('/panel', (c) => {
  return c.html(renderTrpcPanel(appRouter, { url: "http://localhost:4000/trpc" }))
})

export default { 
  port: 4000, 
  fetch: app.fetch,
}
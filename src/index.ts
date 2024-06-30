import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { trpcServer } from '@hono/trpc-server'
import { appRouter } from './router'
import { renderTrpcPanel } from 'trpc-panel'
import { clerkMiddleware } from '@hono/clerk-auth'
import { createTRPCHonoContext } from './lib/context'

const app = new Hono()

app.use(cors({
  origin: '*',
  credentials: true,
}))

app.use('*', clerkMiddleware())

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    createContext: createTRPCHonoContext,
  }),
)

app.get('/panel', (c) => {
  return c.html(renderTrpcPanel(appRouter, { url: "http://localhost:4000/trpc" }))
})

export default { 
  port: 4000, 
  fetch: app.fetch, 
}
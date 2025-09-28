import type { Context as HonoContext } from 'hono'

import { auth } from './auth'

export type Context = Awaited<ReturnType<typeof createContext>>

export type CreateContextOptions = {
  context: HonoContext
}

export async function createContext({ context }: CreateContextOptions) {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  })
  return {
    session,
  }
}

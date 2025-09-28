import { betterAuth, type BetterAuthOptions } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { anonymous } from 'better-auth/plugins'
import { eq } from 'drizzle-orm'

import { db } from '../db'
import * as authSchema from '../db/schema/auth'
import { gamePlayers } from '../db/schema/game'

export const auth = betterAuth<BetterAuthOptions>({
  advanced: {
    defaultCookieAttributes: {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: authSchema,
    usePlural: true,
  }),
  plugins: [
    anonymous({
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        const sourceUserId = anonymousUser.user.id
        const targetUserId = newUser.user.id

        if (!sourceUserId || !targetUserId || sourceUserId === targetUserId) {
          return
        }

        await db
          .update(gamePlayers)
          .set({ userId: targetUserId })
          .where(eq(gamePlayers.userId, sourceUserId))
      },
    }),
  ],
  trustedOrigins: [process.env.CORS_ORIGIN || ''],
})

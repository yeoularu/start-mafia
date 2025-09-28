import { sql } from 'drizzle-orm'
import {
  boolean,
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

import { users } from './auth'

const id = uuid()
  .default(sql`uuidv7()`)
  .primaryKey()

export const gameStatusEnum = pgEnum('game_status', [
  'lobby',
  'in_progress',
  'ended',
])

export const games = pgTable(
  'games',
  {
    id,
    status: gameStatusEnum('status').notNull().default('lobby'),
    config: jsonb('config'),
    startedAt: timestamp('started_at'),
    endedAt: timestamp('ended_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index('games_status_idx').on(table.status)],
)

export const gamePlayers = pgTable(
  'game_players',
  {
    id,
    gameId: uuid('game_id')
      .notNull()
      .references(() => games.id, { onDelete: 'restrict' }),
    userId: text('user_id').references(() => users.id),
    displayName: text('display_name').notNull(),
    joinedAt: timestamp('joined_at').defaultNow().notNull(),
    isHost: boolean('is_host').notNull().default(false),
  },
  (table) => [
    index('game_players_game_idx').on(table.gameId),
    index('game_players_user_idx').on(table.userId),
  ],
)

export const events = pgTable(
  'events',
  {
    id,
    gameId: uuid('game_id')
      .notNull()
      .references(() => games.id, { onDelete: 'restrict' }),
    type: text('type').notNull(),
    payload: jsonb('payload').$type<Record<string, unknown>>().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [index('events_game_idx').on(table.gameId)],
)

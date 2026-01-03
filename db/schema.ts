import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  id: uuid("id").primaryKey().defaultRandom(),
  shortCode: varchar("short_code", { length: 16 }).notNull().unique(),
  originalUrl: varchar("original_url", { length: 2048 }).notNull(),
  userId: varchar("user_id", { length: 64 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

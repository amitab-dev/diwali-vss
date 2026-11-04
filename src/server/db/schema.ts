import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const comments = pgTable("comments", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    comment: text("comment").notNull(),
    ip: text("ip"),
    location: text("location"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}).enableRLS();

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;

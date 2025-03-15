import {
	integer,
	pgTable,
	varchar,
	text,
	boolean,
	timestamp,
} from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	completed: boolean("completed").notNull().default(false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

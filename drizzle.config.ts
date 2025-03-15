import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "db/migrations",
	schema: "./src/lib/drizzle/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: "db/data",
	},
	driver: "pglite",
});

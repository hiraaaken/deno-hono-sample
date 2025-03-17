import { PGlite } from "npm:@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "./schema.ts";

const client = new PGlite({
	dataDir: "./db/data",
});

export const db = drizzle(client, { schema });

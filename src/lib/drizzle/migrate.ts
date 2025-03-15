import { migrate } from "drizzle-orm/pglite/migrator";
import { db } from "./client.ts";

const folderPath = new URL("../../../db/migrations", import.meta.url).pathname;
console.log(folderPath);
await migrate(db, { migrationsFolder: folderPath });

console.log("Migration completed");

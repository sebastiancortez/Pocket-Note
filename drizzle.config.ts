import type { Config } from "drizzle-kit";
export default {
  schema: "./src/lib/db/schema.ts",
  out: "./supabase/migrations",
} satisfies Config;
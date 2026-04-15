import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env file');
}

const DATABASE_URL = process.env.DATABASE_URL as string;

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  }
});

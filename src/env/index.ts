import "dotenv/config";
import * as z from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.url(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid enviroment variables");

  throw new Error("⚠️ Invalid enviroment variables");
}

export const env = _env.data;

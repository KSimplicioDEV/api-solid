import type { User } from "@/generated/prisma/client.js";

export type RegisterUseCaseResponse = {
  user: User;
};

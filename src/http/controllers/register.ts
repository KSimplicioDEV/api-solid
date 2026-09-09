import type { FastifyRequest, FastifyReply } from "fastify";
import { registerBodySchema } from "@/schemas/register-body-schema.js";
import { RegisterUseCase } from "@/use-cases/register.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error.js";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}

import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = await hashPassword(password);
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Usuario no encontrado");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Contraseña Incorrecta");

  const token = generateToken({ user: user.id, email: user.email });
  return { user, token };
};

import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";

const prisma = new PrismaClient();

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = await hashPassword(password);
  const verificationToken = crypto.randomBytes(32).toString("hex");
  console.log("Token de verificación para el usuario:", verificationToken);

  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      verificationToken
    }
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Usuario no encontrado");

  if (!user.emailVerified) {
    throw new Error("Tu correo no ha sido verificado");
  }

  if (!user.password) {
    throw new Error("El usuario esta registrado con Google o Github");
  }

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Contraseña Incorrecta");

  const token = generateToken({ id: user.id, email: user.email });
  return { user, token };
};

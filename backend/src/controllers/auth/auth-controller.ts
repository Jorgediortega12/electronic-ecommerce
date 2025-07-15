import crypto from "crypto";
import { Request, Response } from "express";
import { loginUser, registerUser } from "../../services/auth/auth-services";
import { PrismaClient } from "@prisma/client";
import { sendVerificationEmail } from "../../utils/mailer";
import { hashPassword } from "../../utils/hash";

const prisma = new PrismaClient();

export const loginAuthController = async (_req: Request, res: Response) => {
  try {
    const { email, password } = _req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "El email y la contraseña son obligatorios" });
    }

    const login = await loginUser(email, password);
    res.status(200).json({ login });
  } catch (error: any) {
    console.error("Error al iniciar sesion con el usuario", error);
    res.status(401).json({
      message: "Error al poder iniciar sesión con el usuario",
      error: error.message
    });
  }
};

export const registerAuthController = async (_req: Request, res: Response) => {
  try {
    const { name, email, password } = _req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "El nombre, el email y la contraseña deben ser obligatorios"
      });
    }

    const register = await registerUser(name, email, password);
    res.status(201).json({ register });
  } catch (error: any) {
    console.error("Error a la hora de registrar al usuario", error);
    res.status(500).json({
      message: "Error a la hora de poder registrar al usuario",
      error: error.message
    });
  }
};

export const verifyEmailController = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return res.status(400).json({ message: "Token inválido" });
  }

  const user = await prisma.user.findUnique({
    where: { verificationToken: token }
  });

  if (!user)
    return res
      .status(404)
      .json({ message: "Token no válido o usuario no encontrado" });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verificationToken: null
    }
  });

  res.json({ message: "Correo verificado con éxito" });
};

export const resendVerificationEmailController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "El email es requerido" });

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  if (user.emailVerified) {
    return res
      .status(400)
      .json({ message: "Este usuario ya ha verificado su correo" });
  }

  //calculamos el tiempo entre la creacion de la cuenta y la actualizacion para poder enviar
  //un nuevo correo de autenticacion, pasado este tiempo puede volver el usuario a enviar un correo, esto para evitar saturacion de reenvios de corres.
  const lastSentAt = user.updatedAt || user.createdAt;
  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

  if (lastSentAt > fiveMinutesAgo) {
    return res.status(429).json({
      message: "Espera al menos 5 minutos antes de volver a solicitar el correo"
    });
  }

  const newToken = crypto.randomBytes(32).toString("hex");

  await prisma.user.update({
    where: { id: user.id },
    data: { verificationToken: newToken }
  });

  await sendVerificationEmail(email, newToken);

  res.json({ message: "Correo de verificación reenviado correctamente" });
};

export const requestPasswordResetController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "El email es obligatorio" });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

  await prisma.user.update({
    where: { email },
    data: {
      resetToken,
      resetTokenExpiry: expiryDate
    }
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  // Reutiliza o crea una función dedicada
  await sendVerificationEmail(email, resetLink);

  res.json({
    message: "Hemos enviado un correo para restablecer tu contraseña"
  });
};

export const resetPasswordController = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token y nueva contraseña son requeridos" });
  }

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() }
    }
  });

  if (!user) {
    return res.status(400).json({ message: "Token inválido o expirado" });
  }

  const hashed = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashed,
      resetToken: null,
      resetTokenExpiry: null
    }
  });

  res.json({ message: "Contraseña actualizada correctamente" });
};

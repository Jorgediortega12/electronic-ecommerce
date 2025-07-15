import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../utils/hash";

const prisma = new PrismaClient();

export const getProfileController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Usuario no autenticado" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }

    res.json({ profile: user });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el perfil", error });
  }
};


export const updateProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Usuario no autenticado" });
  }

  const { name, email, password } = req.body;

  try {
    const updateData: any = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = await hashPassword(password);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    res.json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el perfil", error });
  }
};

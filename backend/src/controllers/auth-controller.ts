import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth-services";

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
    res
      .status(401)
      .json({
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

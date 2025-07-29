"use client";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaGoogle, FaGithub } from "react-icons/fa";

import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { loginUser } from "@/api/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user, token } = await loginUser({ email, password });
      useAuth.getState().login(user, token);
      login(user, token);
      toast.success("Inicio de Sesión Exitoso");
      router.push("/product");
    } catch (err: any) {
      toast.error(err?.message || "Error al iniciar sesión");
      setError(err.message);
    }
  };

  {
    /*Colocar autenticacion con google y github cuando aprenda a resolver el problema de prisma */
  }
  const handleGoogleLogin = async () => {
    toast.success("Autenticando con Google...");
    await signIn("google", { callbackUrl: "/product" });
  };

  const handleGithubLogin = async () => {
    toast.success("Autenticando con Github...");
    await signIn("github", { callbackUrl: "/product" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-slate-50 shadow-lg shadow-blue-100/50 border border-blue-100 p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-slate-800">
              Bienvenido
            </h1>
            <p className="text-slate-500">Inicia sesión en tu cuenta</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Botones OAuth */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 hover:bg-slate-50 cursor-pointer"
            >
              <FaGoogle className="text-red-500" size={20} />
              Continuar con Google
            </button>

            <button
              onClick={handleGithubLogin}
              type="button"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
            >
              <FaGithub size={20} />
              Continuar con GitHub
            </button>
          </div>

          {/* Divisor */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-50 px-4 text-slate-500">
                Inicia Sesión
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full bg-white border border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none px-4 py-3 rounded-xl text-slate-700 placeholder-slate-400 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none px-4 py-3 pr-12 rounded-xl text-slate-700 placeholder-slate-400 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors p-1"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
              >
                Iniciar sesión
              </button>

              <button
                onClick={() => router.push("/register")}
                type="button"
                className="w-full bg-white border border-blue-200 text-blue-600 font-medium py-3 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 cursor-pointer"
              >
                Crear cuenta nueva
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              ¿Olvidaste tu contraseña?{" "}
              <button className="text-blue-500 hover:text-blue-600 font-medium">
                Recuperar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/api/authApi";
import { useAuth } from "@/store/auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import toaster from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user, token } = await registerUser({ name, email, password });
      register(user, token);
      toaster.success("El usuario se creó Exitosamente");
    } catch (error: any) {
      toaster.error(error.message || "Error al registrar el usuario");
      setError(error.message);
    }
  };

  // const handleGoogleRegister = async () => {
  //   try {
  //     // Implementar lógica de registro con Google
  //     toaster.success("Registrando con Google...");
  //   } catch (err: any) {
  //     toaster.error("Error al registrarse con Google");
  //   }
  // };

  // const handleGithubRegister = async () => {
  //   try {
  //     // Implementar lógica de registro con GitHub
  //     toaster.success("Registrando con GitHub...");
  //   } catch (err: any) {
  //     toaster.error("Error al registrarse con GitHub");
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-slate-50 border border-blue-100 rounded-2xl p-8 shadow-lg shadow-blue-100/50">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-semibold text-slate-800">
              Crear cuenta
            </h1>
            <p className="text-slate-500">
              Únete a nosotros y comienza tu experiencia
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Botones OAuth */}
          {/* <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleRegister}
              type="button"
              className="w-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 hover:bg-slate-50 cursor-pointer"
            >
              <FaGoogle className="text-red-500" size={20} />
              Registrarse con Google
            </button>

            <button
              onClick={handleGithubRegister}
              type="button"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
            >
              <FaGithub size={20} />
              Registrarse con GitHub
            </button>
          </div> */}

          {/* Divisor */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-50 px-4 text-slate-500">
                Registrate
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                placeholder="Tu nombre completo"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 outline-none transition-colors focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 outline-none transition-colors focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-slate-700 placeholder-slate-400 outline-none transition-colors focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform p-1 text-slate-400 transition-colors hover:text-blue-500"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
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
                className="w-full transform rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-3 font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg cursor-pointer"
              >
                Crear cuenta
              </button>

              <button
                type="button"
                onClick={() => router.push("/")}
                className="w-full rounded-xl border border-blue-200 bg-white py-3 font-medium text-blue-600 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
              >
                Ya tengo cuenta
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Al registrarte, aceptas nuestros{" "}
              <button className="font-medium text-blue-500 hover:text-blue-600">
                términos y condiciones
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

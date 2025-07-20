const API_URL = process.env.NEXT_PUBLIC_API_URL_AUTH

export interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginData) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al iniciar sesión");
  }

  return res.json();
};

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({ name, email, password }: RegisterData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al poder registrar al usuario ");
  }

  return res.json();
};

const API_URL_PROFILE = process.env.NEXT_PUBLIC_API_PROFILE_URL;

export const getProfile = async (token: string) => {
  const res = await fetch(`${API_URL_PROFILE}/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Error al obtener el perfil");
  return res.json();
};

export const updateProfile = async (token: string, profileData: any) => {
  const res = await fetch(`${API_URL_PROFILE}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(profileData)
  });
  if (!res.ok) throw new Error("Error al actualizar el perfil");
  return res.json();
};

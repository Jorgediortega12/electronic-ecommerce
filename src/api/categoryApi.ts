const API_URL_CATEGORY = process.env.NEXT_PUBLIC_API_URL_CATEGORY;

export const getAllCategories = async () => {
  const res = await fetch(`${API_URL_CATEGORY}`);
  if (!res.ok) throw new Error("Error al obtener las categorías");
  return res.json();
};

export const getCategoryById = async (id: number) => {
  const res = await fetch(`${API_URL_CATEGORY}/${id}/products`);
  if (!res.ok) throw new Error("Error al obtener la categoría");
  return res.json();
};

export const createCategory = async (category: { name: string }) => {
  const res = await fetch(`${API_URL_CATEGORY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error("Error al crear la categoría");
  return res.json();
};

export const updateCategory = async (
  id: number,
  category: { name: string }
) => {
  const res = await fetch(`${API_URL_CATEGORY}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error("Error al actualizar la categoría");
  return res.json();
};

export const deleteCategory = async (id: number) => {
  const res = await fetch(`${API_URL_CATEGORY}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar la categoría");
  return res.json();
};


export const getProductsByCategory = async (id: number) => {
  const res = await fetch(`${API_URL_CATEGORY}/${id}/products`);
  if (!res.ok) throw new Error("Error al obtener productos de la categoría");
  return res.json();
};
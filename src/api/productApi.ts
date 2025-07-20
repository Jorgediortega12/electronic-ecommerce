const API_URL_PRODUCT = process.env.NEXT_PUBLIC_API_URL_PRODUCT;

export const getAllProducts = async (): Promise<any> => {
  const res = await fetch(`${API_URL_PRODUCT}`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};

// Obtener producto por ID
export const getProductById = async (id: number): Promise<any> => {
  const res = await fetch(`${API_URL_PRODUCT}/${id}`);
  if (!res.ok) throw new Error("Error al obtener producto");
  return res.json();
};

// Crear un nuevo producto
export const createProduct = async (data: any) => {
  const res = await fetch(`${API_URL_PRODUCT}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
};

// Actualizar producto
export const updateProduct = async (id: number, data: any) => {
  const res = await fetch(`${API_URL_PRODUCT}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
};

// Eliminar producto
export const deleteProduct = async (id: number) => {
  const res = await fetch(`${API_URL_PRODUCT}/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Error al eliminar producto");
  return res.json();
};

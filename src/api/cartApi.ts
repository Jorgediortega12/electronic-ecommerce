const API_URL_CART = process.env.NEXT_PUBLIC_API_URL_CART;

export const getUserCart = async (userId: number) => {
  const res = await fetch(`${API_URL_CART}/${userId}`);
  if (!res.ok) throw new Error("Error al obtener el carrito");
  return res.json();
};

export const calculateCartTotal = async (userId: number) => {
  const res = await fetch(`${API_URL_CART}/calculate/${userId}`);
  if (!res.ok) throw new Error("Error al calcular el total del carrito");
  return res.json();
};

export const addToCart = async (data: {
  userId: number;
  productId: number;
  quantity: number;
}) => {
  const res = await fetch(`${API_URL_CART}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Error al agregar al carrito");
  return res.json();
};

export const updateCartItem = async (data: {
  itemId: number;
  quantity: number;
}) => {
  const res = await fetch(`${API_URL_CART}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Error al actualizar el producto del carrito");
  return res.json();
};

export const removeFromCart = async (itemId: number) => {
  const res = await fetch(`${API_URL_CART}/remove/${itemId}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Error al eliminar el producto del carrito");
  return res.json();
};

export const clearUserCart = async (userId: number) => {
  const res = await fetch(`${API_URL_CART}/clear/${userId}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Error al vaciar el carrito");
  return res.json();
};

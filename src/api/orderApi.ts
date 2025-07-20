const API_URL_ORDER = process.env.NEXT_PUBLIC_API_URL_ORDER;

export const getOrdersByUser = async (userId: number) => {
  const res = await fetch(`${API_URL_ORDER}/user/${userId}`);
  if (!res.ok) throw new Error("Error al obtener órdenes");
  return res.json();
};

export const fetchPaginatedOrders = async (
  userId: number,
  page: number,
  limit: number = 5
) => {
  const res = await fetch(
    `${API_URL_ORDER}/user/${userId}?page=${page}&limit=${limit}`
  );
  if (!res.ok) throw new Error("Error al obtener órdenes paginadas");
  return res.json();
};

export const getOrderHistoryByUser = async (userId: number) => {
  const res = await fetch(`${API_URL_ORDER}/user/${userId}/history`);
  if (!res.ok) throw new Error("Error al obtener historial de pedidos");
  return res.json();
};

export const createOrder = async (orderData: {
  userId: number;
  items: { productId: number; quantity: number }[];
}) => {
  const res = await fetch(`${API_URL_ORDER}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  });
  if (!res.ok) throw new Error("Error al crear orden");
  return res.json();
};

export const getOrderById = async (orderId: number) => {
  const res = await fetch(`${API_URL_ORDER}/${orderId}`);
  if (!res.ok) throw new Error("Error al obtener orden por ID");
  return res.json();
};

export const getOrderStatus = async (orderId: number) => {
  const res = await fetch(`${API_URL_ORDER}/${orderId}/status`);
  if (!res.ok) throw new Error("Error al obtener estado del pedido");
  return res.json();
};

export const updateOrderStatus = async (orderId: number, status: string) => {
  const res = await fetch(`${API_URL_ORDER}/${orderId}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error("Error al actualizar estado del pedido");
  return res.json();
};

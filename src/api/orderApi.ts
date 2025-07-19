const API_URL_NOTIFICATION = "http://localhost:3001/api/notifications";
const API_URL_ORDER = "http://localhost:3001/api/order";

export const getOrdersByUser = async (userId: number) => {
  const res = await fetch(`${API_URL_ORDER}/user/${userId}`);
  if (!res.ok) throw new Error("Error al obtener órdenes");
  return res.json();
};

export const notifyOrder = async (
  orderId: number,
  total: number,
  userEmail: string
) => {
  const res = await fetch(`${API_URL_NOTIFICATION}/confirmation-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, total, userEmail })
  });

  return res.json();
};

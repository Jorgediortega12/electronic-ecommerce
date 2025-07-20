const API_URL_NOTIFICATION = process.env.NEXT_PUBLIC_API_URL_NOTIFICATION;

export const notifyOrder = async (
  orderId: number,
  total: number,
  userEmail: string
) => {
  const res = await fetch(
    `${API_URL_NOTIFICATION}/confirmation-order`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, total, userEmail })
    }
  );

  return res.json();
};

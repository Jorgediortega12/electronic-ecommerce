"use client";

import { useEffect, useState } from "react";
import { getOrdersByUser } from "@/api/orderApi";

interface Order {
  id: number;
  total: number;
  status: string;
  createdAt: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = 1;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersByUser(userId);
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (err) {
        setError("No se pudieron obtener las órdenes");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <p>Cargando órdenes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Mis Pedidos</h1>
      {orders.length === 0 ? (
        <p>No tienes pedidos registrados.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <p>
                <strong>ID del pedido:</strong> {order.id}
              </p>
              <p>
                <strong>Estado:</strong> {order.status}
              </p>
              <p>
                <strong>Total:</strong> ${order.total}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;

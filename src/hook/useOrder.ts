import { useState, useEffect } from "react";
import { getOrdersByUser } from "@/api/orderApi";

export const useOrders = (userId: number) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrdersByUser(userId);
      setOrders(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) loadOrders();
  }, [userId]);

  return { orders, loading, error, reload: loadOrders };
};

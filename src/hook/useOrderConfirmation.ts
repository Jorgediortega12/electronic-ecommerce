import { notifyOrder } from "@/api/orderServices";
import { useState } from "react";

interface Props {
  orderId: number;
  total: number;
  userEmail: string;
}

export const useOrderConfirmation = ({ orderId, total, userEmail }: Props) => {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await notifyOrder(orderId, total, userEmail);
      if (res.notifyOrderConfirmation?.success) {
        setConfirmed(true);
      }
    } catch (err) {
      console.error("Error al confirmar pedido:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    confirmed,
    handleClick
  };
};

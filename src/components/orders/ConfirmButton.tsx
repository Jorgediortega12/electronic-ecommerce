"use client";

import { useOrderConfirmation } from "@/hook/useOrderConfirmation";

interface Props {
  orderId: number;
  total: number;
  userEmail: string;
}

export default function ConfirmButton({ userEmail, orderId, total }: Props) {
  const { loading, confirmed, handleClick } = useOrderConfirmation({
    userEmail,
    orderId,
    total
  });

  if (confirmed)
    return <p className="text-green-600">✅ Confirmación enviada</p>;

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
    >
      {loading ? "Enviando..." : "Confirmar pedido"}
    </button>
  );
}

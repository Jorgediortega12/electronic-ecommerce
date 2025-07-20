"use client";
import { fetchPaginatedOrders } from "@/api/orderApi";
import { useEffect, useState } from "react";

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchPaginatedOrders(page, limit);
        setOrders(data?.orders || []);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    getOrders();
  }, [page]);

  return (
    <div>
      <h1 className="font-semibold text-xl">Pedidos</h1>
      <ul>
        {(orders || []).map((order: any) => (
          <li key={order.id}>
            Orden #{order.id} - ${order.total}
          </li>
        ))}
      </ul>

      <div
        className="pagination"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginTop: "1rem"
        }}
      >
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: page === 1 ? "#ccc" : "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: page === 1 ? "not-allowed" : "pointer"
          }}
        >
          Anterior
        </button>
        <span style={{ fontWeight: "bold" }}>
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: page === totalPages ? "#ccc" : "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: page === totalPages ? "not-allowed" : "pointer"
          }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

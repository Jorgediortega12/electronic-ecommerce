export default function StatusBadge({
  status
}: {
  status: "CONFIRMED" | "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
}) {
  const base = "px-2 py-1 text-sm rounded-full font-medium";
  const statusClass = {
    CONFIRMED: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    SHIPPED: "bg-blue-100 text-blue-800",
    DELIVERED: "bg-purple-100 text-purple-800",
    CANCELLED: "bg-red-100 text-red-800"
  };

  return <span className={`${base} ${statusClass[status]}`}>{status}</span>;
}

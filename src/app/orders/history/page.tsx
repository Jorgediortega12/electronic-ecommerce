import { getOrdersByUser } from "@/api/orderServices";
import OrderCard from "@/components/orders/OrdersCard";


export default async function OrderHistoryPage() {
  const userId = 1; 
  const userEmail = "correo@correo.com";

  const { getOrdersByUser: orders } = await getOrdersByUser(userId);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Historial de pedidos</h1>
      {orders.length === 0 && <p>No hay pedidos realizados.</p>}
      {orders.map((order: any) => (
        <OrderCard key={order.id} order={order} userEmail={userEmail} />
      ))}
    </main>
  );
}
import StatusBadge from "./StatusBadge";
import ConfirmButton from "./ConfirmButton";

interface Props {
  order: {
    id: number;
    total: number;
    status: string;
    createdAt: string;
    products: {
      name: string;
      quantity: number;
    }[];
  };
  userEmail: string;
}

export default function OrderCard({ order, userEmail }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Orden #{order.id}</h2>
        <StatusBadge status="DELIVERED" />
      </div>
      <p>
        Total: <strong>${order.total.toLocaleString()}</strong>
      </p>
      <p className="text-sm text-gray-600">
        Fecha: {new Date(order.createdAt).toLocaleDateString()}
      </p>

      {/*Mostrar productos mas adelante cuando se conecte al backend directamente */}
      {/* <div className="text-sm text-gray-700">
        <p className="font-medium mb-1">Productos:</p>
        <ul className="list-disc list-inside">
          {Array.isArray(order.products) && order.products.length > 0 ? (
            <ul className="list-disc list-inside">
              {order.products.map((product, index) => (
                <li key={index}>
                  {product.name} x {product.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay productos en esta orden.</p>
          )}
        </ul>
      </div> */}

      <ConfirmButton
        orderId={order.id}
        total={order.total}
        userEmail={userEmail}
      />
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

type ProductCardProps = {
  products: Product[];
};

export function ProductList({ products }: ProductCardProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-lg"
        >
          <div className="relative h-48 overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex flex-col flex-1 p-4 justify-between">
            <div>
              <h2 className="text-md font-semibold text-gray-800 line-clamp-1">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-lg font-bold text-indigo-600">
                ${product.price}
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => router.push(`/product/${product.id}`)}
                className="flex-1 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700"
              >
                Ver detalles
              </button>
              <button
                onClick={() => console.log("Producto dentro del Carrito")}
                className="flex-1 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

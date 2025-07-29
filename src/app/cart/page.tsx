"use client";
import ElegantNavbar from "@/components/navbar/Navbar";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();

  return (
    <>
    <ElegantNavbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-500 mt-2">
          Agrega productos para comenzar tu compra.
        </p>
      </div>
    </>
  );
}

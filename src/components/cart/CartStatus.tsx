"use client";

import { useCartStore } from "@/store/cartStore";

export const CartStatus = () => {
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <span className="text-sm font-medium text-white bg-red-500 rounded-full px-2">
      {cartCount}
    </span>
  );
};

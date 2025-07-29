"use client";

import {
  FiShoppingCart,
  FiSettings,
  FiMenu,
  FiX,
  FiSearch
} from "react-icons/fi";
import {
  MdPhoneIphone,
  MdCheckroom,
  MdSportsBasketball,
  MdHome,
  MdLaptop,
  MdWatch
} from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CartStatus } from "../cart/CartStatus";
import { useCartStore } from "../../store/cartStore";
import UserMenu from "../user/UserMenu";

const categories = [
  { name: "Inicio", icon: MdHome },
  { name: "Tecnología", icon: MdPhoneIphone },
  { name: "Ropa", icon: MdCheckroom },
  { name: "Deportes", icon: MdSportsBasketball },
  { name: "Electrónicos", icon: MdLaptop },
  { name: "Accesorios", icon: MdWatch }
];

export default function ElegantNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Inicio");

  const items = useCartStore((state) => state.items);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const router = useRouter();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y Brand */}
          <div
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer">
              MarketPlace
            </span>
          </div>

          {/* Categorías - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                    activeCategory === category.name
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="text-lg" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Acciones del Usuario */}
          <div className="flex items-center space-x-4">
            {/* Buscador */}
            <div className="hidden sm:flex items-center bg-gray-50 rounded-lg px-3 py-2 min-w-[200px]">
              <FiSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none flex-1"
              />
            </div>

            {/* Carrito */}
            <button
              onClick={() => router.push("/cart")}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer"
            >
              {items.length > 0 && <CartStatus />}
              <FiShoppingCart className="text-xl" />
            </button>

            {/* Usuario */}
            <UserMenu />

            {/* Configuración */}
            <button className="hidden sm:block p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer">
              <FiSettings className="text-xl" />
            </button>

            {/* Menú Mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300"
            >
              {isMenuOpen ? (
                <FiX className="text-xl" />
              ) : (
                <FiMenu className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Menú Mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-2">
            {/* Buscador Mobile */}
            <div className="sm:hidden flex items-center bg-gray-50 rounded-lg px-3 py-2 mb-4">
              <FiSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none flex-1"
              />
            </div>

            {/* Categorías Mobile */}
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => {
                    setActiveCategory(category.name);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.name
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="text-xl" />
                  <span>{category.name}</span>
                </button>
              );
            })}

            {/* Configuración Mobile */}
            <button className="sm:hidden flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300">
              <FiSettings className="text-xl" />
              <span>Configuración</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

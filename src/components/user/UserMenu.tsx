"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function UserMenu() {
  const { data: session } = useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative">
      <div onClick={toggleDropdown}>
        {user?.image ? (
          <Image
            src={user.image}
            alt="Avatar"
            width={32}
            height={32}
            className="rounded-full cursor-pointer"
          />
        ) : user?.name ? (
          <div className="bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
            {user.name[0].toUpperCase()}
          </div>
        ) : (
          <FaUserCircle className="text-2xl cursor-pointer" />
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden animate-fade-in z-50 border">
          <ul className="flex flex-col text-sm">
            <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
              Mi perfil
            </li>
            <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
              Mis pedidos
            </li>
            <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
              Configuración
            </li>
            <li
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="hover:bg-red-100 text-red-500 px-4 py-2 cursor-pointer"
            >
              Cerrar sesión
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

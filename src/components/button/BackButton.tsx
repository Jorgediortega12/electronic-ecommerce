"use client";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <FiArrowLeft className="text-lg" />
          <span className="font-medium">Volver a productos</span>
        </button>
      </div>
    </div>
  );
}

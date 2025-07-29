"use client";
import { FiTruck, FiShield, FiRotateCcw } from "react-icons/fi";

export default function ProductDetailsExtras() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <FiTruck className="text-blue-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900 text-sm">Envío gratis</p>
          <p className="text-gray-500 text-xs">En 24-48 horas</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <FiShield className="text-green-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900 text-sm">Garantía</p>
          <p className="text-gray-500 text-xs">2 años oficial</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
          <FiRotateCcw className="text-orange-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900 text-sm">Devoluciones</p>
          <p className="text-gray-500 text-xs">30 días gratis</p>
        </div>
      </div>
    </div>
  );
}

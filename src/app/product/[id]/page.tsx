"use client";

import BackButton from "@/components/button/BackButton";
import ImageGallery from "@/components/image/ImageGallery";
import ProductDetailsExtras from "@/components/product/ProductDetails";
import ProductInfo from "@/components/product/ProductInfo";
import { useState } from "react";
import { FiShoppingCart, FiMinus, FiPlus } from "react-icons/fi";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
  originalPrice?: number;
  stock?: number;
  brand?: string;
  category?: string;
  features?: string[];
  images?: string[];
};

const sampleProduct: Product = {
  id: 1,
  name: "iPhone 15 Pro Max",
  description:
    "El iPhone más avanzado hasta la fecha con el revolucionario chip A17 Pro, sistema de cámaras Pro y diseño de titanio resistente y ligero. Experimenta un rendimiento sin precedentes para gaming, fotografía profesional y productividad.",
  price: 1199,
  originalPrice: 1399,
  image:
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop&crop=center",
  images: [
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&h=800&fit=crop&crop=center"
  ],
  rating: 4.8,  
  reviews: 2847,
  stock: 15,
  brand: "Apple",
  category: "Tecnología",
  features: [
    "Chip A17 Pro de última generación",
    "Sistema de cámaras Pro con zoom óptico 5x",
    "Pantalla Super Retina XDR de 6.7 pulgadas",
    "Diseño de titanio resistente",
    "Batería de larga duración",
    "Compatible con MagSafe y carga inalámbrica"
  ]
};

export default function ElegantProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showZoom, setShowZoom] = useState(false);

  const product = sampleProduct;

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product.stock || 99)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log(
      `Agregando ${quantity} unidades del producto ${product.id} al carrito`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header con navegación */}
      <BackButton />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galería de Imágenes */}
          <ImageGallery
            images={product.images || []}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setShowZoom={setShowZoom}
            mainImage={product.image}
            discount={discount}
          />

          {/* Información del Producto */}
          <div className="space-y-6">
            <ProductInfo
              product={product}
              isWishlisted={isWishlisted}
              toggleWishlist={() => setIsWishlisted(!isWishlisted)}
            />

            {/* Precio */}
            <div className="flex items-center space-x-3">
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock */}
            {product.stock && (
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    product.stock > 10
                      ? "bg-green-500"
                      : product.stock > 5
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {product.stock > 10
                    ? "En stock"
                    : `Solo ${product.stock} disponibles`}
                </span>
              </div>
            )}

            {/* Descripción */}
            <div className="prose prose-gray">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Características */}
            {product.features && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">
                  Características principales:
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cantidad y Agregar al Carrito */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">Cantidad:</span>
                <div className="flex items-center bg-gray-100 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-12 text-center font-medium text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= (product.stock || 99)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Botón Principal */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-3"
              >
                <FiShoppingCart className="text-lg" />
                <span>Agregar al carrito</span>
              </button>
            </div>

            {/* Garantías */}
            <ProductDetailsExtras />
          </div>
        </div>
      </div>
    </div>
  );
}

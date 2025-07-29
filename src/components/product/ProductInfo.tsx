"use client";
import { FiHeart, FiShare2, FiStar } from "react-icons/fi";

interface Props {
  product: any;
  isWishlisted: boolean;
  toggleWishlist: () => void;
}

export default function ProductInfo({
  product,
  isWishlisted,
  toggleWishlist
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600 mb-2">
            {product.brand} • {product.category}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={toggleWishlist}
            className="w-12 h-12 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg"
          >
            <FiHeart
              className={`text-lg ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>
          <button className="w-12 h-12 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg">
            <FiShare2 className="text-lg text-gray-400" />
          </button>
        </div>
      </div>

      {product.rating && (
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-medium text-gray-900">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviews?.toLocaleString()} reseñas)
          </span>
        </div>
      )}
    </div>
  );
}

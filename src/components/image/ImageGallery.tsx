"use client";
import { FiZoomIn } from "react-icons/fi";

interface Props {
  images: string[];
  selectedImage: number;
  setSelectedImage: (index: number) => void;
  setShowZoom: (show: boolean) => void;
  mainImage: string;
  discount: number;
}

export default function ImageGallery({
  images,
  selectedImage,
  setSelectedImage,
  setShowZoom,
  mainImage,
  discount
}: Props) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
        <img
          src={images[selectedImage] || mainImage}
          alt="Producto"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <button
          onClick={() => setShowZoom(true)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
        >
          <FiZoomIn className="text-gray-600" />
        </button>

        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
            -{discount}% OFF
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex space-x-3">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                selectedImage === index
                  ? "border-blue-500 shadow-lg shadow-blue-500/25"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={img}
                alt={`Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

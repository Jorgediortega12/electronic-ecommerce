interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  onAddToCartAction: () => void;
  onViewDetailsAction: () => void;
}

export default function ProductCard({
  name,
  description,
  price,
  image,
  onAddToCartAction,
  onViewDetailsAction
}: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-2 max-w-xs">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1">
          {name}
        </h2>
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
          {description}
        </p>
        <div className="pt-1">
          <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ${price.toFixed(2)}
          </p>
        </div>

        <div className="flex gap-2 pt-3">
          <button
            onClick={onAddToCartAction}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 text-sm"
          >
            Add to Cart
          </button>
          <button
            onClick={onViewDetailsAction}
            className="px-3 py-2 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:bg-gray-50 text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

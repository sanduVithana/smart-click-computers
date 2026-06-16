import React from "react";
import { Link } from "react-router-dom";
import { Eye, BadgeAlert, Sparkles } from "lucide-react";

export default function ProductCard({ product }) {
  const isOutOfStock = product.stockQuantity <= 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 5;
  const firstImage = product.images?.[0]?.url || "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400"; // fallback

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace("LKR", "Rs.");
  };

  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300">
      {/* Featured Badge */}
      {product.featured && (
        <div className="absolute top-3 left-3 z-10 flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold text-white bg-amber-500 rounded-full shadow-sm animate-pulse">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Featured</span>
        </div>
      )}

      {/* Image Gallery Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={firstImage}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Overlay Hover details */}
        <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/products/${product._id}`}
            className="flex items-center space-x-1.5 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md text-sm font-semibold transform translate-y-4 group-hover:translate-y-0 transition duration-300"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </Link>
        </div>
      </div>

      {/* Details Box */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <span>{product.brand}</span>
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-600 dark:text-slate-300 lowercase first-letter:uppercase">
              {product.category?.name || "General"}
            </span>
          </div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-white line-clamp-2 min-h-[3rem] hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </h3>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="block text-xs text-slate-400">Retail Price</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
          </div>

          <div>
            {isOutOfStock ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                Low Stock ({product.stockQuantity})
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                In Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

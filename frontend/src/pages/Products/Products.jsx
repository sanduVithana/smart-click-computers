import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { ProductSkeletonGrid } from "../../components/Loading/Loading";
import { SlidersHorizontal, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination / Info States
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Filters from Search Params
  const searchKeyword = searchParams.get("keyword") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedSort = searchParams.get("sort") || "newest";
  const inStockOnly = searchParams.get("inStock") === "true";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  // Fetch Categories once
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCats();
  }, []);

  // Fetch products when filters or pages change
  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchKeyword) params.append("keyword", searchKeyword);
        if (selectedCategory) params.append("category", selectedCategory);
        if (selectedSort) params.append("sort", selectedSort);
        if (inStockOnly) params.append("inStock", "true");
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        params.append("page", page.toString());
        params.append("limit", "12"); // 12 items per page

        const res = await axios.get(`http://localhost:5000/api/products?${params.toString()}`);
        setProducts(res.data.products || []);
        setPages(res.data.pages || 1);
        setTotal(res.data.total || 0);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, [searchKeyword, selectedCategory, selectedSort, inStockOnly, minPrice, maxPrice, page]);

  // Set Search Param Utility
  const updateQueryParam = (key, value) => {
    setPage(1); // reset to page 1 on filter change
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setPage(1);
    setSearchParams({});
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 bg-white/80 dark:bg-slate-900/80 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm backdrop-blur-md space-y-6 h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold flex items-center space-x-2">
              <SlidersHorizontal className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>Filters</span>
            </h2>
            {(searchKeyword || selectedCategory || inStockOnly || selectedSort !== "newest" || minPrice || maxPrice) && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-medium text-red-500 hover:text-red-600 flex items-center space-x-1"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Categories list */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Categories</h3>
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => updateQueryParam("category", "")}
                className={`text-left text-sm px-3 py-2 rounded-lg font-medium transition ${
                  !selectedCategory
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                }`}
              >
                All Accessories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => updateQueryParam("category", cat._id)}
                  className={`text-left text-sm px-3 py-2 rounded-lg font-medium transition truncate ${
                    selectedCategory === cat._id
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Availability check */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Availability</h3>
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => updateQueryParam("inStock", e.target.checked ? "true" : "")}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          {/* Price Range */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Price Bounds</h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min Rs."
                value={minPrice}
                onChange={(e) => updateQueryParam("minPrice", e.target.value)}
                className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-lg p-2 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <span className="text-slate-400 text-xs">to</span>
              <input
                type="number"
                placeholder="Max Rs."
                value={maxPrice}
                onChange={(e) => updateQueryParam("maxPrice", e.target.value)}
                className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-lg p-2 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </aside>

        {/* Product Catalog Grid Container */}
        <main className="flex-grow space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <SearchBar
              value={searchKeyword}
              onChange={(e) => updateQueryParam("keyword", e.target.value)}
              onClear={() => updateQueryParam("keyword", "")}
              placeholder="Search computer components..."
            />

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <span className="text-xs text-slate-400 hidden sm:inline">{total} products found</span>
              <select
                value={selectedSort}
                onChange={(e) => updateQueryParam("sort", e.target.value)}
                className="text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="priceAsc">Sort: Price (Low to High)</option>
                <option value="priceDesc">Sort: Price (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Grid Area */}
          {loading ? (
            <ProductSkeletonGrid count={8} />
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <p className="text-slate-500 dark:text-slate-400 text-lg">No computer accessories match your filters.</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
              >
                <span>Clear All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {pages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
              <span className="text-sm text-slate-500">
                Page <span className="font-semibold text-slate-700 dark:text-white">{page}</span> of{" "}
                <span className="font-semibold text-slate-700 dark:text-white">{pages}</span>
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-50 transition"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, pages))}
                  disabled={page === pages}
                  className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-50 transition"
                  aria-label="Next Page"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </motion.div>
  );
}

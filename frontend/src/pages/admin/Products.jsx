import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/productService";
import { useAuth } from "../../context/AuthContext";
import { TableSkeleton } from "../../components/Loading/Loading";
import { Edit2, Trash2, Plus, Search, Eye, AlertCircle, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

export default function Products() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id, user.token);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  const filteredProducts = products.filter((prod) => {
    const search = searchQuery.toLowerCase();
    return (
      prod.name.toLowerCase().includes(search) ||
      prod.brand.toLowerCase().includes(search) ||
      prod.productId?.toString().includes(search) ||
      prod.category?.name?.toLowerCase().includes(search)
    );
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    }).format(price).replace("LKR", "Rs.");
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-sm text-slate-500">Manage your computer accessories inventory catalog</p>
        </div>
        <Link
          to="/admin/products/create"
          className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md text-sm font-semibold transition"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Filter and Search controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products by ID, name, brand, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          Showing {filteredProducts.length} of {products.length} products
        </span>
      </div>

      {/* Table grid */}
      {loading ? (
        <TableSkeleton rows={8} cols={6} />
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-500">No products match your search query.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Thumbnail</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Brand</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredProducts.map((prod) => {
                  const thumbnail = prod.images?.[0]?.url || "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=80";
                  const isOutOfStock = prod.stockQuantity <= 0;

                  return (
                    <tr key={prod._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition">
                      <td className="px-6 py-4 font-mono font-semibold text-xs text-slate-400">
                        #{prod.productId || "—"}
                      </td>
                      <td className="px-6 py-4 shrink-0">
                        <div className="h-10 w-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                          <img src={thumbnail} alt="" className="h-full w-full object-contain rounded" />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold max-w-xs truncate">
                        <Link to={`/products/${prod._id}`} className="hover:text-blue-600 transition">
                          {prod.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{prod.brand}</td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-medium">
                          {prod.category?.name || "General"}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold">{formatPrice(prod.price)}</td>
                      <td className="px-6 py-4">
                        {isOutOfStock ? (
                          <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                            Out
                          </span>
                        ) : (
                          <span className="font-semibold">{prod.stockQuantity}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                        <Link
                          to={`/admin/products/edit/${prod._id}`}
                          className="inline-flex p-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/30 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg transition"
                          title="Edit Product"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(prod._id)}
                          className="inline-flex p-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg transition"
                          title="Delete Product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Spinner } from "../../components/Loading/Loading";
import { ArrowLeft, Send, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Page States
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const prodRes = await axios.get(`http://localhost:5000/api/products/${id}`);
        const currentProd = prodRes.data;
        setProduct(currentProd);

        // Set default active image
        if (currentProd.images && currentProd.images.length > 0) {
          setActiveImage(currentProd.images[0].url);
        } else {
          setActiveImage("https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600");
        }

        // Fetch related products (same category, excluding current)
        if (currentProd.category?._id) {
          const relRes = await axios.get(
            `http://localhost:5000/api/products?category=${currentProd.category._id}`
          );
          // filter out current product
          const filtered = (relRes.data.products || []).filter(
            (p) => p._id !== currentProd._id
          );
          setRelated(filtered.slice(0, 4));
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Product not found or database connection failure.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace("LKR", "Rs.");
  };

  const handleQuickInquiry = () => {
    // Redirect to contact page with pre-filled state
    const message = `Hi Smart Click, I'm interested in purchasing the following item:\n\nProduct: ${product.name}\nBrand: ${product.brand}\nPrice: ${formatPrice(product.price)}\n\nPlease provide stock availability and purchasing instructions. Thanks!`;
    navigate("/contact", { state: { message } });
  };

  if (loading) return <div className="min-h-[70vh] flex items-center justify-center"><Spinner size="lg" /></div>;
  if (error) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold">Failed to Load Product</h2>
        <p className="text-slate-500">{error}</p>
        <Link to="/products" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stockQuantity <= 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 5;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16"
    >
      {/* Back Button */}
      <Link to="/products" className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition font-medium">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to products catalog</span>
      </Link>

      {/* Main Info Frame */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Images Columns */}
        <div className="space-y-4">
          <div className="aspect-square bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center p-2">
            <img
              src={activeImage}
              alt={product.name}
              className="h-full w-full object-contain rounded-xl"
            />
          </div>

          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img.url)}
                  className={`relative aspect-square w-20 border-2 rounded-xl overflow-hidden shrink-0 bg-white dark:bg-slate-900 p-1 ${
                    activeImage === img.url
                      ? "border-blue-600 dark:border-blue-400"
                      : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <img src={img.url} alt="" className="h-full w-full object-contain rounded-lg" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Columns */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <span>{product.brand}</span>
              <span className="h-1.5 w-1.5 bg-slate-300 rounded-full"></span>
              <span className="text-slate-500">{product.category?.name}</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">{product.name}</h1>
          </div>

          {/* Pricing & Stock indicators */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <span className="block text-xs text-slate-400">Retail Price</span>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
            </div>

            <div>
              {isOutOfStock ? (
                <div className="flex items-center space-x-1.5 text-red-600 dark:text-red-400 font-semibold text-sm">
                  <AlertCircle className="h-5 w-5" />
                  <span>Out of Stock</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1.5 text-green-600 dark:text-green-400 font-semibold text-sm">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>{isLowStock ? `Low Stock (${product.stockQuantity} Left)` : "In Stock"}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Contact Inquiry */}
          <button
            onClick={handleQuickInquiry}
            className="flex items-center justify-center space-x-2 w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg font-semibold transition"
          >
            <Send className="h-5 w-5" />
            <span>Inquire About This Product</span>
          </button>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold border-b border-slate-200 dark:border-slate-800 pb-2">Description</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm whitespace-pre-line leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold border-b border-slate-200 dark:border-slate-800 pb-2">Specifications</h3>
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {product.specifications.map((spec, index) => (
                      <tr key={index} className="odd:bg-slate-50 dark:odd:bg-slate-800/35">
                        <td className="px-4 py-3 font-semibold text-slate-500 w-1/3 border-r border-slate-200 dark:border-slate-800">{spec.key}</td>
                        <td className="px-4 py-3 text-slate-800 dark:text-slate-200">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Drawer */}
      {related.length > 0 && (
        <section className="space-y-6 pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold">Related Accessories</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {related.map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}

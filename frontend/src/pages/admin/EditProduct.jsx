import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCategories } from "../../services/categoryService";
import { getProductById, updateProduct } from "../../services/productService";
import { useAuth } from "../../context/AuthContext";
import { Spinner } from "../../components/Loading/Loading";
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Page States
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    stockQuantity: "",
    featured: false,
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [specifications, setSpecifications] = useState([]);

  useEffect(() => {
    const loadProductAndCategories = async () => {
      try {
        const [catsRes, prodRes] = await Promise.all([
          getCategories(),
          getProductById(id),
        ]);

        setCategories(catsRes);
        
        const prod = prodRes;
        setFormData({
          name: prod.name,
          description: prod.description,
          category: prod.category?._id || prod.category || "",
          brand: prod.brand,
          price: prod.price,
          stockQuantity: prod.stockQuantity,
          featured: prod.featured || false,
        });
        
        setExistingImages(prod.images || []);
        setSpecifications(
          prod.specifications && prod.specifications.length > 0
            ? prod.specifications
            : [{ key: "", value: "" }]
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product details");
        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    loadProductAndCategories();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSpecChange = (index, field, value) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  const addSpecField = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const removeSpecField = (index) => {
    const updated = [...specifications];
    updated.splice(index, 1);
    setSpecifications(updated);
  };

  const handleFileChange = (e) => {
    setNewImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Filter valid specs
      const validSpecs = specifications.filter((s) => s.key.trim() && s.value.trim());
      data.append("specifications", JSON.stringify(validSpecs));

      // Append new files if any are selected (Multer controller will replace existing on backend if files exist)
      if (newImages.length > 0) {
        for (let i = 0; i < newImages.length; i++) {
          data.append("images", newImages[i]);
        }
      }

      await updateProduct(id, data, user.token);
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center space-x-4">
        <Link to="/admin/products" className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:text-blue-500 transition shadow-sm">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Product</h2>
          <p className="text-sm text-slate-500">Update item details, adjust specifications, and manage images</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: General Info Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-lg font-bold">General Details</h3>
            
            {/* Product Name */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold" htmlFor="name">Product Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Golden Field G6 Gaming Case"
                className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold" htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product specifications summary, review details..."
                rows="5"
                className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Grid fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold" htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold" htmlFor="brand">Brand Name *</label>
                <input
                  id="brand"
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g. Corsair"
                  className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Specifications Panel */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold">Specifications</h3>
              <button
                type="button"
                onClick={addSpecField}
                className="flex items-center space-x-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold transition"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add row</span>
              </button>
            </div>

            <div className="space-y-3">
              {specifications.map((spec, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <input
                    type="text"
                    placeholder="Key (e.g. Interface)"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm flex-1 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. USB 3.0)"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm flex-1 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {specifications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpecField(index)}
                      className="p-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Inventory details, image selection & Featured */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-lg font-bold">Inventory & Price</h3>
            
            {/* Price */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold" htmlFor="price">Price (LKR) *</label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 15000"
                className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Stock Quantity */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold" htmlFor="stockQuantity">Stock Quantity *</label>
              <input
                id="stockQuantity"
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="e.g. 25"
                className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Featured Product Checkbox */}
            <label className="flex items-center space-x-2 pt-2 cursor-pointer font-semibold text-sm">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span>Set Featured Product</span>
            </label>
          </div>

          {/* Current Images and Replacement uploads */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-lg font-bold">Product Images</h3>

            {/* Existing Thumbnail Previews */}
            {existingImages.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs text-slate-400 block font-semibold">Active Images:</span>
                <div className="flex gap-2 flex-wrap">
                  {existingImages.map((img, idx) => (
                    <div key={idx} className="h-12 w-12 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-950 p-0.5">
                      <img src={img.url} alt="" className="h-full w-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* File Upload Form */}
            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start space-x-2 text-[10px] text-amber-600 dark:text-amber-400 mb-2">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Uploading new files will fully replace all active database images. Leave blank to retain existing images.</span>
              </div>

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl p-6 text-center cursor-pointer transition">
                <ImageIcon className="h-10 w-10 text-slate-400 mb-2" />
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Choose new files</span>
                <span className="text-[10px] text-slate-400 mt-1">Upload up to 10 images</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
              {newImages.length > 0 && (
                <div className="text-xs text-slate-500 p-2 bg-slate-50 dark:bg-slate-950 border rounded-xl">
                  {newImages.length} files selected
                </div>
              )}
            </div>
          </div>

          {/* Action Panel */}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center space-x-2 w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg font-semibold transition disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            <span>{saving ? "Saving..." : "Save Updates"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

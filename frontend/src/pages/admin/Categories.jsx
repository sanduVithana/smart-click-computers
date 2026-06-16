import React, { useEffect, useState } from "react";
import { getCategories, createCategory, deleteCategory } from "../../services/categoryService";
import { useAuth } from "../../context/AuthContext";
import { TableSkeleton } from "../../components/Loading/Loading";
import { FolderOpen, Plus, Trash2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function Categories() {
  const { user } = useAuth();
  
  // States
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    try {
      await createCategory(
        { name: name.trim(), description: description.trim() },
        user.token
      );
      toast.success("Category added successfully!");
      setName("");
      setDescription("");
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Deleting this category will unassign it from any linked products. Continue?");
    if (!confirmDelete) return;

    try {
      await deleteCategory(id, user.token);
      toast.success("Category deleted");
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
        <p className="text-sm text-slate-500">Add, view, and organize your product catalog divisions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Creation Form */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-lg font-bold">Add Category</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-semibold" htmlFor="catName">Category Name *</label>
              <input
                id="catName"
                type="text"
                placeholder="e.g. Monitors"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold" htmlFor="catDesc">Description</label>
              <textarea
                id="catDesc"
                placeholder="Brief summary of category products..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center space-x-2 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md text-sm font-semibold transition disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              <span>{submitting ? "Adding..." : "Add Category"}</span>
            </button>
          </form>
        </div>

        {/* Right Side: List Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex items-center justify-between">
            <span className="text-sm font-bold">Category List</span>
            <span className="text-xs text-slate-400 font-medium">{categories.length} total categories</span>
          </div>

          {loading ? (
            <TableSkeleton rows={4} cols={3} />
          ) : categories.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <AlertCircle className="h-10 w-10 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-500">No categories created yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <FolderOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-sm">{cat.name}</span>
                    </div>
                    {cat.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 pl-6 line-clamp-1">{cat.description}</p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="p-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-xl transition"
                    title="Delete Category"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
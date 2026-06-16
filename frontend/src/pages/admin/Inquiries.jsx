import React, { useEffect, useState } from "react";
import { getInquiries, updateInquiryStatus, deleteInquiry } from "../../services/inquiryService";
import { useAuth } from "../../context/AuthContext";
import { TableSkeleton } from "../../components/Loading/Loading";
import { Mail, Check, Trash2, Calendar, Phone, User, AlertCircle, X, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";

export default function Inquiries() {
  const { user } = useAuth();
  
  // Page States
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null); // for details modal

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await getInquiries(user.token);
      setInquiries(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [user.token]);

  const handleMarkStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "unread" ? "read" : "unread";
    try {
      await updateInquiryStatus(id, nextStatus, user.token);
      toast.success(`Inquiry marked as ${nextStatus}`);
      fetchInquiries();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update inquiry status");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer inquiry? This cannot be undone.");
    if (!confirmDelete) return;

    try {
      await deleteInquiry(id, user.token);
      toast.success("Inquiry deleted successfully");
      if (selectedInquiry?._id === id) setSelectedInquiry(null); // close modal if open
      fetchInquiries();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete inquiry");
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Customer Inquiries</h2>
        <p className="text-sm text-slate-500">Read and manage contact requests submitted by visitors</p>
      </div>

      {/* Main Grid */}
      {loading ? (
        <TableSkeleton rows={6} cols={5} />
      ) : inquiries.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <Mail className="h-12 w-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-500">No customer inquiries found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {inquiries.map((inq) => {
            const isUnread = inq.status === "unread";
            return (
              <div
                key={inq._id}
                className={`bg-white dark:bg-slate-900 border p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-md ${
                  isUnread
                    ? "border-l-4 border-l-red-500 border-slate-200 dark:border-slate-850"
                    : "border-slate-200 dark:border-slate-800"
                }`}
              >
                {/* Details */}
                <div
                  className="space-y-2 flex-grow cursor-pointer"
                  onClick={() => {
                    // Mark as read automatically when opened
                    if (isUnread) {
                      handleMarkStatus(inq._id, "unread");
                    }
                    setSelectedInquiry(inq);
                  }}
                >
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="font-bold text-sm text-slate-800 dark:text-white">{inq.name}</span>
                    <span className="text-xs text-slate-400">({inq.email})</span>
                    {isUnread && (
                      <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Unread
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-1 italic">
                    "{inq.message}"
                  </p>

                  <div className="flex items-center space-x-4 text-xs text-slate-400 flex-wrap gap-y-1">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formatDate(inq.createdAt)}</span>
                    </span>
                    {inq.phone && (
                      <span className="flex items-center space-x-1">
                        <Phone className="h-3.5 w-3.5" />
                        <span>{inq.phone}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 shrink-0 self-end md:self-auto">
                  <button
                    onClick={() => handleMarkStatus(inq._id, inq.status)}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center space-x-1 transition ${
                      isUnread
                        ? "bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/30 border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400"
                        : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
                    }`}
                    title={isUnread ? "Mark Read" : "Mark Unread"}
                  >
                    <Check className="h-4 w-4" />
                    <span className="hidden sm:inline">{isUnread ? "Mark Read" : "Mark Unread"}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(inq._id)}
                    className="p-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/50 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-xl transition"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Inquiry Detail View Modal Overlay */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-3xl shadow-2xl p-6 relative animate-slide-in">
            {/* Close Button */}
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl shrink-0">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">{selectedInquiry.name}</h3>
                  <span className="text-xs text-slate-400">{selectedInquiry.email}</span>
                </div>
              </div>

              {/* Inquiry Details Info */}
              <div className="space-y-4 text-sm">
                {selectedInquiry.phone && (
                  <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-400">Phone Contact:</span>
                    <span className="font-semibold">{selectedInquiry.phone}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="font-medium text-slate-400">Submitted Date:</span>
                  <span className="font-semibold">{formatDate(selectedInquiry.createdAt)}</span>
                </div>

                <div className="space-y-2">
                  <span className="font-semibold text-slate-400 block">Message Details:</span>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 max-h-56 overflow-y-auto leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex justify-end space-x-3">
                <button
                  onClick={() => handleDelete(selectedInquiry._id)}
                  className="flex items-center space-x-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition border border-red-200 dark:border-red-900/30"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Inquiry</span>
                </button>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition"
                >
                  Close Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

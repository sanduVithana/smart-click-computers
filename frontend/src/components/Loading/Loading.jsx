import React from "react";

export function Spinner({ size = "md", className = "" }) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div
        className={`animate-spin rounded-full border-t-blue-600 border-r-transparent border-slate-200 dark:border-slate-800 ${sizeClasses[size]} ${className}`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 animate-pulse"
        >
          {/* Image skeleton */}
          <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl w-full"></div>
          {/* Title skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
          </div>
          {/* Footer skeleton */}
          <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="space-y-1 w-1/3">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 animate-pulse">
      <div className="bg-slate-50 dark:bg-slate-800/50 h-12 border-b border-slate-200 dark:border-slate-800"></div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div key={rIdx} className="flex p-4 items-center space-x-4">
            {Array.from({ length: cols }).map((_, cIdx) => (
              <div
                key={cIdx}
                className="h-4 bg-slate-200 dark:bg-slate-800 rounded flex-1"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Loading() {
  return <Spinner size="lg" />;
}

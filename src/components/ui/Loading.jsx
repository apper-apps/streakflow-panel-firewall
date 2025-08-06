import React from "react";

const Loading = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-8 bg-gradient-to-r from-surface-200 to-surface-300 rounded-lg w-48 animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-surface-200 to-surface-300 rounded-lg w-64 animate-pulse"></div>
        </div>
        <div className="h-10 bg-gradient-to-r from-surface-200 to-surface-300 rounded-lg w-32 animate-pulse"></div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-surface-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 bg-gradient-to-r from-surface-200 to-surface-300 rounded w-24 animate-pulse"></div>
              <div className="w-10 h-10 bg-gradient-to-r from-surface-200 to-surface-300 rounded-full animate-pulse"></div>
            </div>
            <div className="h-8 bg-gradient-to-r from-surface-200 to-surface-300 rounded w-16 animate-pulse mb-2"></div>
            <div className="h-4 bg-gradient-to-r from-surface-200 to-surface-300 rounded w-20 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Goal Cards Skeleton */}
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-surface-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gradient-to-r from-surface-200 to-surface-300 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-surface-200 to-surface-300 rounded w-full animate-pulse"></div>
                <div className="flex gap-3">
                  <div className="h-6 bg-gradient-to-r from-surface-200 to-surface-300 rounded-full w-16 animate-pulse"></div>
                  <div className="h-6 bg-gradient-to-r from-surface-200 to-surface-300 rounded w-20 animate-pulse"></div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-surface-200 to-surface-300 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-surface-200 to-surface-300 rounded-lg animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 bg-gradient-to-r from-surface-200 to-surface-300 rounded-full w-24 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-surface-200 to-surface-300 rounded w-16 animate-pulse"></div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-surface-200 to-surface-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
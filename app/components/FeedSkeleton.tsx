// components/FeedSkeleton.tsx
import React from "react";

export function FeedSkeleton() {
  return (
    <div className="space-y-4 w-full animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-zinc-900 p-4 sm:p-6 rounded-xl border border-zinc-800 space-y-4"
        >
          {/* Avatar + Name */}
          <div className="flex items-center gap-3">
            <div className="bg-zinc-700 rounded-full w-10 h-10"></div>
            <div className="flex flex-col gap-2">
              <div className="h-3 w-32 bg-zinc-700 rounded"></div>
              <div className="h-3 w-20 bg-zinc-700 rounded"></div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-zinc-700 rounded"></div>
            <div className="h-3 w-5/6 bg-zinc-700 rounded"></div>
          </div>

          {/* Image placeholder */}
          <div className="h-48 w-full bg-zinc-700 rounded-lg"></div>

          {/* Actions */}
          <div className="flex gap-6 pt-2">
            <div className="h-3 w-10 bg-zinc-700 rounded"></div>
            <div className="h-3 w-12 bg-zinc-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

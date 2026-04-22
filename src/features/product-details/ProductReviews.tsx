"use client";
import { Star } from "lucide-react";

export const ProductReviews = ({ reviews }: { reviews: any[] }) => {
  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    /* Changed to grid-cols-4 and ensured w-full to stretch across the page */
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
      {/* LEFT COLUMN: Summary Card (Tucked to the side) */}
      <div className="lg:col-span-1 bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-xl h-fit border border-gray-100 dark:border-gray-800 shadow-sm">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
          Rating Summary
        </h3>
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-5xl font-black text-gray-900 dark:text-white">
            {averageRating}
          </span>
          <span className="text-gray-400 font-medium">/ 5</span>
        </div>

        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((num) => {
            const count = reviews.filter(
              (r) => Math.round(r.rating) === num,
            ).length;
            const percentage = (count / reviews.length) * 100;
            return (
              <div key={num} className="flex items-center gap-3 text-[11px]">
                <div className="flex items-center gap-1 w-7">
                  {num}{" "}
                  <Star size={10} className="fill-yellow-500 text-yellow-500" />
                </div>
                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-4 text-gray-400 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: Reviews (Stretched to fill the remaining space) */}
      <div className="lg:col-span-3 flex flex-col gap-4">
        {reviews.map((item, index) => (
          <div
            key={index}
            /* Removing bg-transparent and using a subtle white/dark card to fill the space visually */
            className="w-full bg-white dark:bg-[#121212] p-6 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 shadow-sm transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-full font-bold uppercase shadow-inner">
                  {item.reviewerName.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
                    {item.reviewerName}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-tighter">
                    {new Date(item.date).toLocaleDateString("en-KE", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < item.rating
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-200 dark:text-gray-700"
                    }
                  />
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed pl-1">
              "{item.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

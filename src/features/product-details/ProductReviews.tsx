"use client";
import { Star, History, ShoppingCart } from "lucide-react";
import { useRecent } from "@/src/context/RecentViewedContext";
import { useCart } from "@/src/context/CartContext";
import Link from "next/link";

export const ProductReviews = ({ reviews }: { reviews: any[] }) => {
  const { recent } = useRecent();
  const { addToCart } = useCart();

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    /* Using 12 columns to force the 'Recent' container to the very end */
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
      {/* LEFT: Rating Summary (3 Columns) */}
      <div className="lg:col-span-3 bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-xl h-fit border border-gray-100 dark:border-gray-800 shadow-sm sticky top-24">
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
                <div className="flex items-center gap-1 w-7 text-gray-600 dark:text-gray-400">
                  {num}{" "}
                  <Star size={10} className="fill-yellow-500 text-yellow-500" />
                </div>
                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-4 text-gray-400 text-right font-medium">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CENTER: Reviews (Expanded to 6 Columns) */}
      <div className="lg:col-span-6 flex flex-col gap-4">
        {reviews.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white dark:bg-[#121212] p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all"
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
                  <span className="text-[10px] text-gray-400 uppercase tracking-tight">
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

      {/* RIGHT: Recent Picks (3 Columns - Full Stretch to Right) */}
      <div className="lg:col-span-3 h-full flex justify-end">
        <div className="sticky top-24 bg-white dark:bg-[#121212] rounded-xl border border-border-subtle p-5 shadow-sm min-h-[450px] w-full flex flex-col">
          <div className="flex items-center gap-2 mb-6 border-b border-border-subtle pb-4">
            <History size={16} className="text-primary" />
            <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-900 dark:text-white">
              Recent Picks
            </h3>
          </div>

          <div className="flex flex-col gap-8 flex-1">
            {recent && recent.length > 0 ? (
              recent.slice(0, 4).map((item: any) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col gap-3 border-b border-gray-50 dark:border-white/5 pb-5 last:border-0"
                >
                  <Link
                    href={`/product/${item.id}`}
                    className="flex gap-4 items-center"
                  >
                    <div className="w-16 h-16 bg-white rounded border border-border-subtle p-1 shrink-0 overflow-hidden shadow-sm">
                      <img
                        src={item.thumbnail}
                        alt=""
                        className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200 truncate group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </p>
                      <p className="text-primary text-[10px] font-black mt-1">
                        KES {item.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>

                  <button
                    onClick={() => addToCart(item)}
                    className="w-full py-2 bg-gray-50 dark:bg-white/5 hover:bg-primary hover:text-white border border-gray-200 dark:border-white/10 hover:border-primary text-[10px] font-bold uppercase rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-sm active:scale-95"
                  >
                    <ShoppingCart size={13} />
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 opacity-40">
                <History size={24} className="mb-2 text-gray-300" />
                <p className="text-[10px] text-gray-400 italic">
                  No recent activity
                </p>
              </div>
            )}
          </div>

          <Link
            href="/"
            className="block mt-8 text-center text-[10px] font-bold text-medium-gray hover:text-primary uppercase tracking-tighter border border-dashed border-gray-200 dark:border-white/10 rounded-lg py-3 transition-all hover:bg-gray-50 dark:hover:bg-white/5"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

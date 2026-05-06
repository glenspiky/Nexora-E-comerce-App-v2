"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductList } from "@/src/features/products/ProductList";
import { Product } from "@/src/types/types";

// 1. Move your logic into a separate internal component
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
        );
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-white font-black animate-pulse uppercase tracking-widest">
          Searching Nexora...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white w-full overflow-x-hidden">
      <div className="max-w-360 mx-auto px-6 py-12">
        <header className="mb-12 border-l-4 border-primary pl-6">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
            Found <span className="text-primary ">{products.length}</span>{" "}
            Results for:
            <br />
            <span className="text-primary ">&quot;{query}&quot;</span>
          </h1>
        </header>

        <div className="w-full block">
          <ProductList products={products} />
        </div>

        {products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500 uppercase font-bold">
              No products found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// 2. The main page exports the Content wrapped in Suspense
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <p className="text-white font-black uppercase tracking-widest">
            Loading...
          </p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}

"use client";
import { useEffect, useState } from "react";
import { ProductList } from "./ProductList";
import { SkeletonLoader } from "@/src/components/ui/skeleton/Skeleton";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=100");
        const data = await response.json();
        const highQuality = data.products.filter(
          (item: any) => new Set(item.images).size >= 2
        );
        setProducts(highQuality);
      } catch (error) {
        console.error(error);
      } finally {
        // Adding a slight delay so you can actually see the smooth skeleton
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="w-full py-5">
      <div className="w-[min(95%,1268px)] mx-auto">
        {loading ? (
          <SkeletonLoader count={10} />
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </section>
  );
};
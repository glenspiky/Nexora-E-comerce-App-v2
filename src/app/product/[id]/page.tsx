"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductImageGallery } from "@/src/features/product-details/ProductImageGallery";
import { ProductInfo } from "@/src/features/product-details/ProductInfo";
import { PurchaseCard } from "@/src/features/product-details/PurchaseCard";
import { ProductCard } from "@/src/features/products/ProductCard";
import { ProductReviews } from "@/src/features/product-details/ProductReviews";
import { useRecent } from "@/src/context/RecentViewedContext";

export default function ProductDetails() {
  const params = useParams();
  const id = params.id;
  const { addToRecent } = useRecent()

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);

        const catRes = await fetch(
          `https://dummyjson.com/products/category/${data.category}`,
        );
        const catData = await catRes.json();
        setRelated(
          catData.products.filter((p: any) => p.id !== data.id).slice(0, 4),
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0); // Ensures user starts at top on route change
  }, [id]);

  useEffect(() => {
    if (product) {
      addToRecent(product);
    }
  }, [product]);

  if (loading || !product)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 font-medium">
        Loading Product Details...
      </div>
    );

 return (
   <div className="max-w-[1268px] mx-auto p-4 lg:p-6">
     {/* --- TOP SECTION: Hero Layout --- */}
     <div className="flex flex-col lg:flex-row gap-12 items-start">
       {/* 1. Left: Images - Shrunk to 35% */}
       <div className="w-full lg:w-[35%] lg:sticky lg:top-24">
         <ProductImageGallery
           images={product.images}
           thumbnail={product.thumbnail}
         />
       </div>

       {/* 2. Center: Core Info - Expanded to 40% */}
       <div className="w-full lg:w-[40%]">
         <ProductInfo product={product} />
       </div>

       {/* 3. Right: Purchase Action Card - Kept at 25% */}
       <div className="w-full lg:w-[25%] lg:sticky lg:top-24">
         <PurchaseCard product={product} />
       </div>
     </div>

     {/* --- MIDDLE SECTION: Detailed Reviews --- */}
     <section className="mt-16 pt-10 border-t border-gray-100">
       <div className="max-w-[850px]">
         <h2 className="text-2xl font-bold mb-8 text-gray-900 uppercase tracking-tight">
           Verified Customer Feedback
         </h2>
         <ProductReviews reviews={product.reviews} />
       </div>
     </section>

     {/* --- BOTTOM SECTION: Recommendations --- */}
     <section className="mt-20 pt-10 border-t border-gray-100 pb-10">
       <h2 className="text-xl font-bold mb-8 text-gray-800 uppercase tracking-wide">
         You might also like
       </h2>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {related.map((item: any) => (
           <ProductCard key={item.id} item={item} />
         ))}
       </div>
     </section>
   </div>
 );
}

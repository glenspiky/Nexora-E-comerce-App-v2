import { Product } from "@/src/types/types";
import { ProductCard } from "./ProductCard";

export const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-[clamp(10px,2vw,15px)] items-stretch">
      {products.map((item) => (
          <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

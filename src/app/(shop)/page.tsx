import { TopSellers } from "@/src/components/layout/topselers/TopSellers";
import { Products } from "@/src/features/products/Products";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <TopSellers></TopSellers>
      <Products></Products>
    </div>
  );
}

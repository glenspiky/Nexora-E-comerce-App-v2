import { ProductCard } from "@/src/features/products/ProductCard";

async function GetPrductCategory(category: string) {
  const res = await fetch(
    `https://dummyjson.com/products/category/${category}`,
  );
  const data = await res.json();
  return data.products;
}

// 1. Update the type: params is now a Promise
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 2. Await the params before using them
  const { slug } = await params;

  const products = await GetPrductCategory(slug);

  return (
    <div className="max-w-[1440px] mx-auto p-6">
      <h1 className="text-2xl font-bold capitalize mb-6">{slug}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
}

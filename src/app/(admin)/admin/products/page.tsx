export const dynamic = "force-dynamic";
import { Package, AlertCircle } from "lucide-react";
import ProductTableClient from "./ProductTableClient";
type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
};
async function getProducts() {
  try {
    // Adding a small timeout/no-cache to ensure fresh data
    const res = await fetch("https://dummyjson.com/products", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return null; // Return null to trigger the error UI
  }
}

export default async function AdminProducts() {
  const products = await getProducts();

  // 1. Check if the API failed entirely
  if (products === null) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
        <AlertCircle className="w-12 h-12 mb-2 text-red-400" />
        <p>Could not connect to the product API.</p>
      </div>
    );
  }

  // 2. Check if the API returned an empty list
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
        <Package className="w-12 h-12 mb-2 opacity-20" />
        <p>No products found in inventory.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-zinc-900">
          <Package className="w-6 h-6" /> Inventory
        </h1>
        <p className="text-sm text-zinc-500">Total Items: {products.length}</p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="p-4 font-medium text-zinc-600">Product</th>
              <th className="p-4 font-medium text-zinc-600">Category</th>
              <th className="p-4 font-medium text-zinc-600">Price</th>
              <th className="p-4 font-medium text-zinc-600 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr
                key={product.id}
                className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
              >
                <td className="p-4">
                  <div className="font-medium text-zinc-900">
                    {product.title}
                  </div>
                  <div className="text-xs text-zinc-400">ID: #{product.id}</div>
                </td>
                <td className="p-4 text-sm text-zinc-600">
                  {product.category}
                </td>
                <td className="p-4 text-zinc-900 font-semibold">
                  USD {product.price}
                </td>
                <td className="p-4 text-right">
                  <ProductTableClient productId={product.id.toString()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

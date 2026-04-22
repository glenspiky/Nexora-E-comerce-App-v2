import { ProductRating } from "../products/ProductRating";

export const ProductInfo = ({ product }: { product: any }) => {
  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(0);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
      <p className="text-gray-500 text-sm leading-relaxed">
        {product.description}
      </p>

      <div className="flex items-center gap-3">
        <ProductRating rating={product.rating} />
        <span className="text-xs text-gray-400 border-l pl-3">
          {product.reviews.length} Reviews
        </span>
      </div>

      {/* Offer Section */}
      <div className="border border-green-600 rounded-t-lg overflow-hidden">
        <div className="bg-green-600 text-white px-3 py-1 flex justify-between text-xs font-bold uppercase">
          <span>SuperDeal</span>
          <span>Ends: Dec 11</span>
        </div>
        <div className="p-4 flex items-center gap-4">
          <h2 className="text-3xl font-bold">KES {product.price}</h2>
          <div className="flex flex-col">
            <span className="bg-red-500 text-white text-[10px] px-1 rounded font-bold w-fit">
              {product.stock} Left
            </span>
            <span className="text-gray-400 line-through text-xs italic">
              KES {originalPrice}
            </span>
          </div>
          <p className="ml-auto text-white bg-orange-500 px-2 py-1 rounded text-sm">
            -{product.discountPercentage}%
          </p>
        </div>
      </div>

      {/* Specs */}
      <div className="mt-6 pt-6 border-t">
        <h5 className="font-bold text-sm mb-4">Technical Specifications</h5>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg text-sm">
          <div>
            <span className="text-gray-400">Brand:</span>{" "}
            <strong>{product.brand}</strong>
          </div>
          <div>
            <span className="text-gray-400">Weight:</span>{" "}
            <strong>{product.weight}g</strong>
          </div>
          <div>
            <span className="text-gray-400">Dimensions:</span>{" "}
            <strong>
              {product.dimensions.width}x{product.dimensions.height} cm
            </strong>
          </div>
          <div>
            <span className="text-gray-400">SKU:</span>{" "}
            <strong>{product.sku}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

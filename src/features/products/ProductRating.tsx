import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number;
}

export const ProductRating = ({ rating }: ProductRatingProps) => {
  // We'll create an array of 5 elements to map over
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {stars.map((star) => (
          <Star
            key={star}
            size={16}
            // If the star index is <= our rating, fill it in
            className={`${
              star <= Math.round(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-gray-500 ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

"use client";
import { useState, useRef } from "react";
import Image from "next/image";

export const ProductImageGallery = ({
  images,
  thumbnail,
}: {
  images: string[];
  thumbnail: string;
}) => {
  const [selectedImg, setSelectedImg] = useState(thumbnail);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    // Calculate mouse position relative to image in percentage
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[420px] mx-auto lg:mx-0">
      {/* --- Main Image Container with Zoom Logic --- */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
        className="relative aspect-square w-full overflow-hidden border border-gray-100 rounded-xl bg-white shadow-sm cursor-zoom-in"
      >
        <Image
          src={selectedImg}
          alt="Main product"
          fill
          priority
          className={`object-contain p-10 transition-transform duration-200 ease-out ${
            isZooming ? "scale-[2.5]" : "scale-100"
          }`}
          style={{
            transformOrigin: isZooming
              ? `${zoomPos.x}% ${zoomPos.y}%`
              : "center",
          }}
        />
      </div>

      {/* --- Thumbnails Row --- */}
      <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide justify-center lg:justify-start">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImg(img)}
            className={`relative w-16 h-16 shrink-0 border-2 rounded-lg overflow-hidden bg-white transition-all ${
              selectedImg === img
                ? "border-orange-500 ring-2 ring-orange-100"
                : "border-gray-100 hover:border-gray-300"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${i}`}
              fill
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

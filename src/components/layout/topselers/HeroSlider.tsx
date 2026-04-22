"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  "/images/banner1.png",
  "/images/banner2.png",
  "/images/banner3.png",
  "/images/banner5.png",
  "/images/banner6.png",
  "/images/banner7.png",
];

export const HeroSlider = () => {
  const slides = [...banners, banners[0]];
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setIsTransitioning(true);
    setIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (index === 0) return;
    setIsTransitioning(true);
    setIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index === slides.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(0);
      }, 500);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, slides.length]);

  return (
    <div className="relative group overflow-hidden w-full rounded-sm bg-white">
      {/* Slider Track */}
      <div
        className="flex"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {slides.map((banner, i) => (
          <div key={i} className="min-w-full relative">
            <img
              src={banner}
              alt={`Banner ${i + 1}`}
              className="w-full h-auto block object-contain"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/30 text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/30 text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, i) => {
          // Logic to handle the "cloned" slide active state
          const isActive = index % banners.length === i;

          return (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`cursor-pointer transition-all duration-300 rounded-full ${
                isActive
                  ? "bg-primary w-5 h-2" // Active dot is a pill shape
                  : "bg-white/60 hover:bg-white w-2 h-2" // Inactive dots are small circles
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

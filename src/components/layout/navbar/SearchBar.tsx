"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length > 1) {
        try {
          const res = await fetch(
            `https://dummyjson.com/products/search?q=${searchTerm}&limit=6`,
          );
          const data = await res.json();
          setSuggestions(data.products || []);
          setShowDropdown(true);
        } catch (err) {
          console.error("Suggestion fetch failed", err);
        }
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    };

    const delay = setTimeout(fetchSuggestions, 200);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  // 2. Click Outside Logic
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    setShowDropdown(false);
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setShowDropdown(true);
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      if (activeIndex !== -1) {
        e.preventDefault();
        const selected = suggestions[activeIndex].title;
        setSearchTerm(selected);
        handleSearch(selected);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-[2] max-w-3xl mx-6 lg:mx-12"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchTerm);
        }}
        className="flex items-center gap-0 group"
      >
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-medium-gray group-focus-within:text-primary transition-colors pointer-events-none"
            size={18}
          />
          <Input
            type="text"
            value={searchTerm}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm.length > 1 && setShowDropdown(true)}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setActiveIndex(-1);
            }}
            placeholder="Search products, brands and categories..."
            className="w-full border-r-0 h-11 pl-10 pr-10 bg-light-gray border border-solid border-medium-gray rounded-r-none focus-visible:ring-0 focus-visible:border-primary outline-none text-sm text-text-main transition-all"
          />

          {/* X BUTTON: Ensures clear state */}
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSuggestions([]);
                setShowDropdown(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full text-gray-400 transition-colors z-20"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <Button
          type="submit"
          className="h-11 px-6 bg-primary hover:bg-primary-hover text-white font-bold rounded-l-none border border-primary transition-colors uppercase text-xs tracking-wider"
        >
          Search
        </Button>
      </form>

      {/* SUGGESTIONS DROPDOWN: High Z-index and forced visibility */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.3)] overflow-hidden z-[9999]">
          {suggestions.map((item, index) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => {
                setSearchTerm(item.title);
                handleSearch(item.title);
              }}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-sm transition-colors
                ${
                  index === activeIndex
                    ? "bg-gray-100 dark:bg-white/10 text-primary"
                    : "text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                }
              `}
            >
              <Search size={14} className="opacity-30" />
              <span className="truncate">{item.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

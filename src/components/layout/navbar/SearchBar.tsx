"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { Button } from "@/components/ui/button";


export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <div className="relative flex-[2] max-w-3xl mx-6 lg:mx-12">
      <form onSubmit={handleSearch} className="flex items-center gap-0 group">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-medium-gray group-focus-within:text-primary transition-colors pointer-events-none"
            size={18}
          />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products, brands and categories..."
            className="w-full border-r-0 h-11 pl-10 pr-4 bg-light-gray border border-solid border-medium-gray rounded-r-none focus-visible:ring-0 focus-visible:border-primary outline-none text-sm text-text-main transition-all"
          />
        </div>

        {/* Visible Search Button */}
        <Button
          type="submit"
          className="h-11 px-6 bg-primary hover:bg-primary-hover text-white font-bold rounded-l-none border border-primary transition-colors uppercase text-xs tracking-wider"
        >
          Search
        </Button>
      </form>
    </div>
  );
}

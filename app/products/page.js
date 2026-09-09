"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/products";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("popular");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => (a.prices?.A6 || 29) - (b.prices?.A6 || 29));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => (b.prices?.A3 || 179) - (a.prices?.A3 || 179));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [category, sortBy, search, products]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 w-48 mx-auto"></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6">
        {category
          ? categories.find((c) => c.id === category)?.name || category
          : "All Posters"}
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posters..."
          className="flex-1 px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <option value="popular">Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      <p className="text-xs text-gray-500 mb-4">{filtered.length} products</p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-sm">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">
          Loading...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

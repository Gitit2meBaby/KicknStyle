"use client";

import { useState, useEffect } from "react";
import { getProducts } from "../lib/woocommerce";

export function useProducts(initialFilters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filters, setFilters] = useState({
    page: 1,
    perPage: 12,
    category: "",
    tag: "",
    search: "",
    orderBy: "date",
    order: "desc",
    onSale: null,
    featured: null,
    minPrice: null,
    maxPrice: null,
    ...initialFilters,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await getProducts(filters);
        setProducts(result.products);
        setTotalPages(result.totalPages);
        setTotalProducts(result.totalProducts);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page || 1, // Reset to page 1 when filters change
    }));
  };

  return {
    products,
    loading,
    error,
    filters,
    updateFilters,
    totalPages,
    totalProducts,
  };
}

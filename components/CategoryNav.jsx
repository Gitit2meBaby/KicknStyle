// CategoryNav.jsx
"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import {
  getCategories,
  getAttributes,
  getAttributeTerms,
} from "../lib/woocommerce";

import styles from "../styles/categoryNav.module.scss";

const PriceRanges = [
  { min: 0, max: 250000, label: "n'importe lequel" },
  { min: 0, max: 25, label: "sous €25" },
  { min: 25, max: 50, label: "€25 - €50" },
  { min: 50, max: 100, label: "€50 - €100" },
  { min: 100, max: null, label: "sur €100" },
];

export default function CategoryNav() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSlug = pathname.split("/").pop();

  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    price: null,
    attributes: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesData, attributesData] = await Promise.all([
          getCategories(),
          getAttributes(),
        ]);

        // Get terms for each attribute
        const attributesWithTerms = await Promise.all(
          attributesData.map(async (attribute) => {
            const terms = await getAttributeTerms(attribute.id);
            return {
              ...attribute,
              terms: terms.sort((a, b) => b.count - a.count),
            };
          })
        );

        // Filter and sort categories - current category first, then alphabetically
        const filteredCategories = categoriesData
          .filter((cat) => cat.slug !== "uncategorized")
          .sort((a, b) => {
            if (a.slug === currentSlug) return -1;
            if (b.slug === currentSlug) return 1;
            return a.name.localeCompare(b.name);
          });

        setCategories(filteredCategories);
        setAttributes(attributesWithTerms);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentSlug]);

  // Handle URL params on component mount and updates
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const newFilters = { price: null, attributes: {} };

    // Extract price filter
    const priceParam = params.get("price");
    if (priceParam) {
      const [min, max] = priceParam.split("-").map(Number);
      newFilters.price = { min, max };
    }

    // Extract attribute filters
    attributes.forEach((attr) => {
      const values = params.getAll(attr.name.toLowerCase());
      if (values.length > 0) {
        newFilters.attributes[attr.name.toLowerCase()] = values;
      }
    });

    setActiveFilters(newFilters);
  }, [searchParams, attributes]);

  const updateFilters = (type, value, attributeName = null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (type === "price") {
      // Clear previous price filter
      params.delete("price");

      // If selecting the same price range, clear it. Otherwise, set new range
      if (
        activeFilters.price?.min !== value.min ||
        activeFilters.price?.max !== value.max
      ) {
        params.set("price", `${value.min}-${value.max}`);
      }
    } else if (type === "attribute") {
      const currentValues = params.getAll(attributeName);
      params.delete(attributeName);

      if (!currentValues.includes(value)) {
        params.append(attributeName, value);
      } else {
        // Re-add all values except the one being toggled
        currentValues
          .filter((v) => v !== value)
          .forEach((v) => params.append(attributeName, v));
      }
    }

    // Update URL and trigger page refresh
    router.push(`${pathname}?${params.toString()}`);
  };

  if (loading) {
    return <div className={styles.loading}>Loading filters...</div>;
  }

  return (
    <nav className={styles.categoryNav}>
      {/* Categories displayed at the top level */}
      <div className={styles.categoriesList}>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categorie/${category.slug}`}
            className={`${styles.categoryLink} ${
              category.slug === currentSlug ? styles.active : ""
            }`}
          >
            {category.name} ({category.count})
          </Link>
        ))}
      </div>

      {/* Only show filters if we're in a category */}
      {currentSlug && currentSlug !== "catalogue" && (
        <div className={styles.filters}>
          <h3 className={styles.filtersTitle}>Filtres</h3>

          {/* Price Filter Section */}
          <details className={styles.filterSection}>
            <summary className={styles.sectionTitle}>Prix</summary>
            <div className={styles.filterContent}>
              {PriceRanges.map((range, index) => (
                <label key={index} className={styles.filterOption}>
                  <input
                    type="radio"
                    name="price"
                    checked={
                      activeFilters.price?.min === range.min &&
                      activeFilters.price?.max === range.max
                    }
                    onChange={() => updateFilters("Prix", range)}
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </details>

          {/* Attribute Filter Sections */}
          {attributes.map((attribute) => (
            <details key={attribute.id} className={styles.filterSection}>
              <summary className={styles.sectionTitle}>
                {attribute.name}
              </summary>
              <div className={styles.filterContent}>
                {/* Add "Any" option */}
                <label className={`${styles.filterOption} ${styles.anyOption}`}>
                  <input
                    type="radio"
                    name={attribute.name.toLowerCase()}
                    checked={
                      !activeFilters.attributes[attribute.name.toLowerCase()]
                        ?.length
                    }
                    onChange={() => {
                      const params = new URLSearchParams(
                        searchParams.toString()
                      );
                      params.delete(attribute.name.toLowerCase());
                      router.push(`${pathname}?${params.toString()}`);
                    }}
                  />
                  <span>n'importe lequel</span>
                </label>

                {/* Individual attribute terms */}
                {attribute.terms.map((term) => (
                  <label key={term.id} className={styles.filterOption}>
                    <input
                      type="radio"
                      name={attribute.name.toLowerCase()}
                      checked={activeFilters.attributes[
                        attribute.name.toLowerCase()
                      ]?.includes(term.slug)}
                      onChange={() =>
                        updateFilters(
                          "attribute",
                          term.slug,
                          attribute.name.toLowerCase()
                        )
                      }
                    />
                    <span>
                      {term.name} ({term.count})
                    </span>
                  </label>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </nav>
  );
}

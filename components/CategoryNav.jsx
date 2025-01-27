"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { The_Nautigal } from "next/font/google";

const nautigal = The_Nautigal({
  subsets: ["latin"],
  weight: ["700"],
});

import styles from "../styles/categoryNav.module.scss";

const PriceRanges = [
  { min: 0, max: 250000, label: "n'importe lequel", isDefault: true },
  { min: 0, max: 25, label: "sous €25" },
  { min: 25, max: 50, label: "€25 - €50" },
  { min: 50, max: 100, label: "€50 - €100" },
  { min: 100, max: 250000, label: "sur €100" },
];

export default function CategoryNavClient({
  initialCategories,
  initialAttributes,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSlug = pathname.split("/").pop();

  // Memoize sorted categories
  const categories = useMemo(() => {
    return [...initialCategories].sort((a, b) => {
      if (a.slug === currentSlug) return -1;
      if (b.slug === currentSlug) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [initialCategories, currentSlug]);

  const [activeFilters, setActiveFilters] = useState({
    prix: null,
    attributes: {},
  });

  // Memoize filter update logic
  const updateFilters = useCallback(
    (type, value, attributeName = null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (type === "prix") {
        params.delete("prix");
        const isDefault = value.isDefault;
        const isSameRange =
          activeFilters.prix?.min === value.min &&
          activeFilters.prix?.max === value.max;

        if (!isDefault && !isSameRange) {
          params.set("prix", `${value.min}-${value.max}`);
        }
      } else if (type === "attribute") {
        const currentValues = params.getAll(attributeName);
        params.delete(attributeName);

        if (!currentValues.includes(value)) {
          params.append(attributeName, value);
        } else {
          currentValues
            .filter((v) => v !== value)
            .forEach((v) => params.append(attributeName, v));
        }
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, activeFilters.prix, pathname, router]
  );

  // Update active filters when URL changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const newFilters = { prix: null, attributes: {} };

    const priceParam = params.get("prix");
    if (priceParam) {
      const [min, max] = priceParam.split("-").map(Number);
      const matchingRange = PriceRanges.find(
        (range) => range.min === min && range.max === max
      );
      if (matchingRange) {
        newFilters.prix = matchingRange;
      }
    }

    initialAttributes.forEach((attr) => {
      const values = params.getAll(attr.name.toLowerCase());
      if (values.length > 0) {
        newFilters.attributes[attr.name.toLowerCase()] = values;
      }
    });

    setActiveFilters(newFilters);
  }, [searchParams, initialAttributes]);

  return (
    <nav className={styles.categoryNav}>
      <div className={styles.categoriesList}>
        {categories.map((category, index) => (
          <Link
            href={`/categorie/${category.slug}`}
            key={category.id}
            className={`
              ${styles.categoryLink}
              ${category.slug !== currentSlug ? styles.active : ""}
              ${
                index === 0
                  ? `${styles.firstCategory} ${nautigal.className} ${styles.firstCategoryLink}`
                  : ""
              }
            `}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {currentSlug && currentSlug !== "catalogue" && (
        <div className={styles.filters}>
          <h3 className={`${styles.filtersTitle} ${nautigal.className}`}>
            Filtres
          </h3>

          <details className={styles.filterSection}>
            <summary className={styles.sectionTitle}>Prix</summary>
            <div className={styles.filterContent}>
              {PriceRanges.map((range, index) => (
                <label key={index} className={styles.filterOption}>
                  <input
                    type="radio"
                    name="prix"
                    checked={
                      (range.isDefault && !activeFilters.prix) ||
                      (activeFilters.prix?.min === range.min &&
                        activeFilters.prix?.max === range.max)
                    }
                    onChange={() => updateFilters("prix", range)}
                  />
                  <div className={styles.radioControl}></div>
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </details>

          {initialAttributes.map((attribute) => (
            <details key={attribute.id} className={styles.filterSection}>
              <summary className={styles.sectionTitle}>
                {attribute.name}
              </summary>
              <div className={styles.filterContent}>
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
                  <div className={styles.radioControl}></div>
                  <span>n'importe lequel</span>
                </label>

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
                    <div className={styles.radioControl}></div>
                    <span>{term.name}</span>
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

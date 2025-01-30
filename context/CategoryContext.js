// // context/CategoryContext.js
// "use client";
// import React, { createContext, useContext, useState, useEffect } from "react";
// import {
//   getCategories,
//   getAttributes,
//   getAttributeTerms,
// } from "../lib/woocommerce";

// const CategoryContext = createContext();

// // Cache keys
// const CACHE_KEYS = {
//   DATA: "categoryData",
//   TIMESTAMP: "categoryDataTimestamp",
//   LAST_REVALIDATION: "lastRevalidationTimestamp",
// };

// export function CategoryProvider({ children }) {
//   const [categories, setCategories] = useState([]);
//   const [attributes, setAttributes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Function to fetch and cache category data
//   const fetchAndCacheData = async () => {
//     try {
//       setLoading(true);
//       const [categoriesData, attributesData] = await Promise.all([
//         getCategories(),
//         getAttributes(),
//       ]);

//       // Get terms for each attribute
//       const attributesWithTerms = await Promise.all(
//         attributesData.map(async (attribute) => {
//           const terms = await getAttributeTerms(attribute.id);
//           return {
//             ...attribute,
//             terms: terms.sort((a, b) => b.count - a.count),
//           };
//         })
//       );

//       // Filter out uncategorized category and sort
//       const filteredCategories = categoriesData
//         .filter((cat) => cat.slug !== "uncategorized")
//         .sort((a, b) => a.name.localeCompare(b.name));

//       // Update state
//       setCategories(filteredCategories);
//       setAttributes(attributesWithTerms);

//       // Cache the data with current timestamp
//       const currentTime = new Date().getTime();
//       const dataToCache = {
//         categories: filteredCategories,
//         attributes: attributesWithTerms,
//       };
//       localStorage.setItem(CACHE_KEYS.DATA, JSON.stringify(dataToCache));
//       localStorage.setItem(CACHE_KEYS.TIMESTAMP, currentTime.toString());
//     } catch (error) {
//       console.error("Error fetching category data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize data from cache or fetch
//   useEffect(() => {
//     const initializeData = async () => {
//       const cachedData = localStorage.getItem(CACHE_KEYS.DATA);
//       const lastRevalidation =
//         localStorage.getItem(CACHE_KEYS.LAST_REVALIDATION) || "0";
//       const cacheTimestamp = localStorage.getItem(CACHE_KEYS.TIMESTAMP);

//       // Check if cache needs revalidation
//       const needsRevalidation =
//         !cachedData ||
//         !cacheTimestamp ||
//         parseInt(cacheTimestamp) < parseInt(lastRevalidation);

//       if (!needsRevalidation && cachedData) {
//         // Use cached data
//         const parsedData = JSON.parse(cachedData);
//         setCategories(parsedData.categories);
//         setAttributes(parsedData.attributes);
//         setLoading(false);
//       } else {
//         // Fetch fresh data
//         await fetchAndCacheData();
//       }
//     };

//     initializeData();
//   }, []);

//   // Set up revalidation listener
//   useEffect(() => {
//     // Create a BroadcastChannel for cross-tab communication
//     const revalidationChannel = new BroadcastChannel("category-revalidation");

//     // Listen for revalidation messages
//     revalidationChannel.onmessage = async (event) => {
//       if (event.data.type === "REVALIDATE") {
//         localStorage.setItem(
//           CACHE_KEYS.LAST_REVALIDATION,
//           event.data.timestamp.toString()
//         );
//         await fetchAndCacheData();
//       }
//     };

//     // Cleanup
//     return () => {
//       revalidationChannel.close();
//     };
//   }, []);

//   // Expose a manual revalidation function
//   const revalidate = async () => {
//     await fetchAndCacheData();
//   };

//   return (
//     <CategoryContext.Provider
//       value={{ categories, attributes, loading, revalidate }}
//     >
//       {children}
//     </CategoryContext.Provider>
//   );
// }

// export function useCategories() {
//   const context = useContext(CategoryContext);
//   if (!context) {
//     throw new Error("useCategories must be used within a CategoryProvider");
//   }
//   return context;
// }

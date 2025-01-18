"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { addToCart } from "../lib/cartUtils";
import {
  getPrintfulColorName,
  getSwatchColor,
  isDarkColor,
  extractHexCode,
} from "../lib/colorSystem";

import styles from "../styles/productDisplay.module.scss";

// Helper functions
const isColorAttribute = (attributeName) => {
  const colorNames = ["color", "colour", "couleur"];
  return colorNames.includes(attributeName.toLowerCase());
};

const isSizeAttribute = (attributeName) => {
  const sizeNames = ["size", "sizes", "taille"];
  return sizeNames.includes(attributeName.toLowerCase());
};

const ProductDisplay = ({
  id,
  name,
  description,
  shortDescription,
  price,
  regularPrice,
  salePrice,
  stockStatus,
  images,
  attributes,
  variations,
  ...props
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [currentPrice, setCurrentPrice] = useState(price);
  const [currentVariation, setCurrentVariation] = useState(null);
  const [currentStockStatus, setCurrentStockStatus] = useState(stockStatus);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    // Verify we have all required selections
    const requiredAttributes =
      attributes?.filter((attr) => attr.variation) || [];
    const allVariantsSelected = requiredAttributes.every(
      (attr) => selectedVariants[attr.name.toLowerCase()] !== undefined
    );

    if (variations?.length && !allVariantsSelected) {
      alert("Please select all options before adding to cart");
      return;
    }

    const productData = {
      id,
      name,
      currentPrice: currentVariation ? currentVariation.price : price,
      price: price,
      images,
    };

    const cartTotal = addToCart(
      productData,
      quantity,
      Object.keys(selectedVariants).length > 0 ? selectedVariants : null
    );

    if (cartTotal > 0) {
      // Show added to cart feedback
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);

      // Force a re-render of CartCounter
      window.dispatchEvent(new Event("storage"));
    } else {
      alert("There was an error adding the item to cart. Please try again.");
    }
    setAddedToCart(true);
  };

  // Initialize selected variants based on default attributes
  useEffect(() => {
    if (attributes?.length > 0) {
      const initialVariants = {};
      attributes.forEach((attr) => {
        if (attr.variation && attr.options?.length > 0) {
          initialVariants[attr.name.toLowerCase()] = attr.options[0];
        }
      });
      setSelectedVariants(initialVariants);
    }
  }, [attributes]);

  // Update price and availability when variants change
  useEffect(() => {
    console.log("Current variations:", variations);
    console.log("Selected variants:", selectedVariants);
    console.log("All attributes:", attributes);

    // Check if all required variants are selected
    const requiredAttributes =
      attributes?.filter((attr) => attr.variation) || [];
    const allVariantsSelected = requiredAttributes.every(
      (attr) => selectedVariants[attr.name.toLowerCase()] !== undefined
    );

    console.log("Required attributes:", requiredAttributes);
    console.log("All variants selected:", allVariantsSelected);

    if (variations?.length > 0 && allVariantsSelected) {
      const matchingVariation = findMatchingVariation(selectedVariants);
      console.log("Matching variation found:", matchingVariation);
      setCurrentVariation(matchingVariation);

      if (matchingVariation) {
        setCurrentPrice(matchingVariation.price);
        setCurrentStockStatus(matchingVariation.stock_status);
      } else {
        console.log(
          "No matching variation found for selected options:",
          selectedVariants
        );
      }
    }
  }, [selectedVariants, variations, attributes]);

  const findMatchingVariation = (selected) => {
    if (!variations?.length) {
      console.log("No variations available");
      return null;
    }

    console.log("Finding variation for:", selected);

    return variations.find((variation) => {
      console.log("Checking variation:", variation);

      if (!variation.attributes?.length) {
        console.log("No attributes in variation:", variation);
        return false;
      }

      // Create a map of the variation's attributes for easier matching
      const variationAttrs = variation.attributes.reduce((acc, attr) => {
        const name = (attr.name || attr.attribute)
          .toLowerCase()
          .replace("pa_", "");
        const value = (attr.option || attr.value || "").toLowerCase();
        acc[name] = value;
        return acc;
      }, {});

      console.log("Variation attributes:", variationAttrs);

      // Check if all selected attributes match
      return Object.entries(selected).every(([name, value]) => {
        const matches =
          variationAttrs[name.toLowerCase()] === value.toLowerCase();
        console.log(
          `Checking ${name}: ${value} against ${
            variationAttrs[name.toLowerCase()]
          } = ${matches}`
        );
        return matches;
      });
    });
  };

  // New function to find image index by color
  // Update the findImageIndexByColor function
  const findImageIndexByColor = (colorName) => {
    const printfulColor = getPrintfulColorName(colorName);
    console.log("Looking for color:", printfulColor);

    return images.findIndex((image) => {
      // Check for hex code in image metadata first
      const imageTitle = image.name || image.title || image.alt || "";
      const hexCode = extractHexCode(imageTitle);

      if (hexCode) {
        // If the color name itself is a hex code, compare directly
        const colorHex = extractHexCode(colorName);
        if (colorHex) {
          return hexCode.toLowerCase() === colorHex.toLowerCase();
        }
      }

      // If no hex match, fall back to text matching
      const alt = (image.alt || "").toLowerCase().trim();
      const name = (image.name || "").toLowerCase().trim();

      const searchTerms = [
        printfulColor,
        printfulColor.replace(/-/g, " "), // hyphen to space
        printfulColor.replace(/\s+/g, "-"), // space to hyphen
      ];

      return searchTerms.some(
        (term) => alt.includes(term) || name.includes(term)
      );
    });
  };

  // Update the renderColorOption function to use the new image-aware color swatch system
  const renderColorOption = (option, attributeName, isSelected) => {
    // Find the corresponding image for this color option
    const imageIndex = findImageIndexByColor(option);
    const matchingImage = imageIndex !== -1 ? images[imageIndex] : null;

    const backgroundColor = getSwatchColor(option, matchingImage);
    const isDark = isDarkColor(option);

    return (
      <label
        key={option}
        className={`${styles.colorOption} ${
          isSelected ? styles.selectedColor : ""
        }`}
        title={option}
      >
        <input
          type="radio"
          name={attributeName}
          value={option}
          checked={isSelected}
          onChange={() => handleVariantChange(attributeName, option)}
          className={styles.hiddenRadio}
        />
        <span
          className={`${styles.colorSwatch} ${isDark ? styles.darkColor : ""}`}
          style={{ backgroundColor }}
        ></span>
      </label>
    );
  };

  const handleVariantChange = (attributeName, value) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [attributeName.toLowerCase()]: value,
    }));

    if (isColorAttribute(attributeName)) {
      console.log("Color change attempted:", value);
      const imageIndex = findImageIndexByColor(value);
      console.log("Found image index:", imageIndex, "for color:", value);

      if (imageIndex !== -1) {
        setSelectedImage(imageIndex);
      } else {
        console.log("No matching image found for color:", value);
        console.log("Available images:", images);
      }
    }
  };

  // const renderColorOption = (option, attributeName, isSelected) => {
  //   const backgroundColor = getSwatchColor(option);
  //   const isDark = isDarkColor(option);

  //   return (
  //     <label
  //       key={option}
  //       className={`${styles.colorOption} ${
  //         isSelected ? styles.selectedColor : ""
  //       }`}
  //       title={option}
  //     >
  //       <input
  //         type="radio"
  //         name={attributeName}
  //         value={option}
  //         checked={isSelected}
  //         onChange={() => handleVariantChange(attributeName, option)}
  //         className={styles.hiddenRadio}
  //       />
  //       <span
  //         className={`${styles.colorSwatch} ${isDark ? styles.darkColor : ""}`}
  //         style={{ backgroundColor }}
  //       ></span>
  //     </label>
  //   );
  // };

  const renderVariantOptions = (attribute) => {
    const isColor = isColorAttribute(attribute.name);
    const isSize = isSizeAttribute(attribute.name);
    const currentValue = selectedVariants[attribute.name.toLowerCase()];

    return (
      <div key={attribute.name} className={styles.variantGroup}>
        <h3 className={styles.variantTitle}>{attribute.name}</h3>
        <div className={isColor ? styles.colorOptions : styles.variantOptions}>
          {attribute.options.map((option) => {
            const isSelected = currentValue === option;

            if (isColor) {
              return renderColorOption(option, attribute.name, isSelected);
            }

            return (
              <label
                key={option}
                className={`${styles.variantOption} ${
                  isSelected ? styles.selected : ""
                } ${isSize ? styles.sizeOption : ""}`}
              >
                <input
                  type="radio"
                  name={attribute.name}
                  value={option}
                  checked={isSelected}
                  onChange={() => handleVariantChange(attribute.name, option)}
                  className={styles.hiddenRadio}
                />
                <span className={styles.optionLabel}>{option}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.productDisplay}>
      <h1 className={styles.title}>{name}</h1>

      {/* Images */}
      <div className={styles.imageSection}>
        <div className={styles.mainImage}>
          {images?.[selectedImage]?.src && (
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt || name}
              width={600}
              height={600}
              className={styles.image}
            />
          )}
        </div>

        {images?.length > 1 && (
          <div className={styles.thumbnails}>
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`${styles.thumbnail} ${
                  selectedImage === index ? styles.active : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt || `${name} - view ${index + 1}`}
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Variants Selection */}
      {attributes?.filter((attr) => attr.variation)?.map(renderVariantOptions)}

      {/* Price Display */}
      <div className={styles.priceSection}>
        <strong>Prix:</strong> €{currentPrice}
        {currentVariation?.sale_price && (
          <span className={styles.salePrice}>
            {" "}
            (prix de vente: €{currentVariation.sale_price}, prix: €
            {currentVariation.regular_price})
          </span>
        )}
      </div>

      {/* Quantity Selector */}
      <div className={styles.quantitySelector}>
        <button
          className={styles.quantityButton}
          onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(Number(e.target.value), 1))}
          className={styles.quantityInput}
          min="1"
        />
        <button
          className={styles.quantityButton}
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        className={styles.addToCart}
        disabled={
          !currentVariation || currentVariation.stock_status === "outofstock"
        }
        onClick={() => {
          console.log("Add to Cart clicked");
          console.log("Current variation:", currentVariation);
          console.log("Selected variants:", selectedVariants);
          handleAddToCart();
        }}
      >
        {(() => {
          const missingSelections = attributes
            ?.filter((attr) => attr.variation)
            ?.filter((attr) => !selectedVariants[attr.name.toLowerCase()])
            ?.map((attr) => attr.name);

          if (missingSelections?.length > 0) {
            return `Select ${missingSelections.join(" and ")}`;
          }

          if (!currentVariation) {
            return "Combination not available";
          }

          if (currentVariation.stock_status === "outofstock") {
            return "Out of stock";
          }

          if (addedToCart) {
            return "Added";
          }

          return "Add to Cart";
        })()}
      </button>

      {/* Stock Status */}
      <div className={styles.stockStatus}>
        <strong>Stock Status:</strong> {currentStockStatus}
      </div>

      {/* Description */}
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default ProductDisplay;

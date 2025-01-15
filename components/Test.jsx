"use client";
import Image from "next/image";
import React, { useState } from "react";
import { addToCart } from "../utils/cartUtils";
import styles from "../styles/productDisplay.module.scss";

const ProductDisplay = ({
  id,
  name,
  images,
  price,
  description,
  shortDescription,
  variations,
  attributes,
  stockStatus,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    // Check if all attributes are selected when variations exist
    if (
      variations?.length &&
      Object.keys(selectedAttributes).length !== attributes?.length
    ) {
      alert("Please select all options before adding to cart");
      return;
    }

    const cartTotal = addToCart(
      { id, name, price, images },
      quantity,
      selectedVariant
    );

    // Show added to cart feedback
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);

    // Force a re-render of CartCounter
    window.dispatchEvent(new Event("storage"));
  };

  const handleAttributeChange = (attributeName, value) => {
    const newAttributes = {
      ...selectedAttributes,
      [attributeName]: value,
    };
    setSelectedAttributes(newAttributes);

    // Find matching variant if all attributes are selected
    if (variations?.length) {
      const matchingVariant = variations.find((variant) => {
        return Object.entries(variant.attributes).every(
          ([key, attrValue]) => newAttributes[key] === attrValue
        );
      });
      setSelectedVariant(matchingVariant || null);
    }
  };

  const isOutOfStock = stockStatus === "outofstock";

  return (
    <div className={styles.productDisplay}>
      <div className={styles.imageContainer}>
        <div className={styles.mainImageWrapper}>
          <Image
            src={images?.[selectedImage]?.src || "/placeholder-product.jpg"}
            alt={images?.[selectedImage]?.alt || name}
            width={600}
            height={600}
            className={styles.mainImage}
          />
        </div>
        {images?.length > 1 && (
          <div className={styles.thumbnails}>
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={`${styles.thumbnailButton} ${
                  selectedImage === index ? styles.active : ""
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={100}
                  height={100}
                  className={styles.thumbnail}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.productInfo}>
        <h1 className={styles.productTitle}>{name}</h1>
        <div className={styles.price}>
          ${selectedVariant ? selectedVariant.price : price}
        </div>

        {shortDescription && (
          <div
            className={styles.shortDescription}
            dangerouslySetInnerHTML={{ __html: shortDescription }}
          />
        )}

        {attributes?.map((attribute) => (
          <div key={attribute.id} className={styles.attributeSelector}>
            <label htmlFor={`attribute-${attribute.id}`}>
              {attribute.name}:
            </label>
            <select
              id={`attribute-${attribute.id}`}
              onChange={(e) =>
                handleAttributeChange(attribute.name, e.target.value)
              }
              value={selectedAttributes[attribute.name] || ""}
            >
              <option value="">Select {attribute.name}</option>
              {attribute.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className={styles.quantitySelector}>
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            disabled={isOutOfStock}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            min="1"
            disabled={isOutOfStock}
          />
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            disabled={isOutOfStock}
          >
            +
          </button>
        </div>

        <button
          className={`${styles.addToCartButton} ${
            addedToCart ? styles.added : ""
          }`}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          {isOutOfStock
            ? "Out of Stock"
            : addedToCart
            ? "Added to Cart!"
            : "Add to Cart"}
        </button>

        {description && (
          <div className={styles.description}>
            <h2>Description</h2>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDisplay;

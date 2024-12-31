"use client";
import React, { useState } from "react";

const ProductDisplay = ({
  id,
  name,
  slug,
  permalink,
  dateCreated,
  dateCreatedGmt,
  dateModified,
  dateModifiedGmt,
  type,
  status,
  featured,
  catalogVisibility,
  description,
  shortDescription,
  sku,
  price,
  regularPrice,
  salePrice,
  dateOnSaleFrom,
  dateOnSaleFromGmt,
  dateOnSaleTo,
  dateOnSaleToGmt,
  onSale,
  purchasable,
  totalSales,
  virtual,
  downloadable,
  downloads,
  downloadLimit,
  downloadExpiry,
  externalUrl,
  buttonText,
  taxStatus,
  taxClass,
  manageStock,
  stockQuantity,
  backorders,
  backordersAllowed,
  backordered,
  lowStockAmount,
  soldIndividually,
  weight,
  dimensions,
  shippingRequired,
  shippingTaxable,
  shippingClass,
  shippingClassId,
  reviewsAllowed,
  averageRating,
  ratingCount,
  upsellIds,
  crossSellIds,
  parentId,
  purchaseNote,
  categories,
  tags,
  images,
  attributes,
  defaultAttributes,
  variations,
  groupedProducts,
  menuOrder,
  priceHtml,
  relatedIds,
  metaData,
  stockStatus,
  hasOptions,
  postPassword,
  globalUniqueId,
  customField,
  links,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  console.log("Product Data:", {
    id,
    name,
    slug,
    permalink,
    dateCreated,
    dateCreatedGmt,
    dateModified,
    dateModifiedGmt,
    type,
    status,
    featured,
    catalogVisibility,
    description,
    shortDescription,
    sku,
    price,
    regularPrice,
    salePrice,
    dateOnSaleFrom,
    dateOnSaleFromGmt,
    dateOnSaleTo,
    dateOnSaleToGmt,
    onSale,
    purchasable,
    totalSales,
    virtual,
    downloadable,
    downloads,
    downloadLimit,
    downloadExpiry,
    externalUrl,
    buttonText,
    taxStatus,
    taxClass,
    manageStock,
    stockQuantity,
    backorders,
    backordersAllowed,
    backordered,
    lowStockAmount,
    soldIndividually,
    weight,
    dimensions,
    shippingRequired,
    shippingTaxable,
    shippingClass,
    shippingClassId,
    reviewsAllowed,
  });

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>
        <strong>Price:</strong> ${price}
        {salePrice && (
          <span>
            {" "}
            (Sale Price: ${salePrice}, Regular Price: ${regularPrice})
          </span>
        )}
      </p>
      <div>
        <strong>Stock Status:</strong> {stockStatus}
      </div>
      <div>
        <strong>Short Description:</strong> {shortDescription}
      </div>
      <div>
        <strong>Images:</strong>
        {images.length > 0 ? (
          <img
            src={images[selectedImage]?.src}
            alt={images[selectedImage]?.alt || "Product Image"}
            style={{ maxWidth: "100%" }}
          />
        ) : (
          <p>No images available.</p>
        )}
        {images.length > 1 && (
          <div>
            {images.map((img, index) => (
              <img
                key={img.id}
                src={img.src}
                alt={img.alt || `Image ${index + 1}`}
                style={{
                  maxWidth: "50px",
                  cursor: "pointer",
                  border: selectedImage === index ? "2px solid blue" : "none",
                }}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <strong>Shipping Required:</strong> {shippingRequired ? "Yes" : "No"}
      </div>
      <div>
        <strong>Shipping Taxable:</strong> {shippingTaxable ? "Yes" : "No"}
      </div>
      <div>
        <strong>Categories:</strong>{" "}
        {categories.map((category) => category.name).join(", ")}
      </div>
      <div>
        <strong>Tags:</strong> {tags.map((tag) => tag.name).join(", ")}
      </div>
      <div>
        <strong>Weight:</strong> {weight || "Not specified"}
      </div>
      <div>
        <strong>Dimensions:</strong> {dimensions.length || "Not specified"} x{" "}
        {dimensions.width || "Not specified"} x{" "}
        {dimensions.height || "Not specified"}
      </div>
      <div>
        <button
          onClick={() =>
            setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
          }
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(Number(e.target.value), 1))}
        />
        <button onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}>
          +
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;

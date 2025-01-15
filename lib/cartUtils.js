// lib/cartUtils.js

// Create a custom event for cart updates
const CART_UPDATE_EVENT = "cartUpdate";

export const addToCart = (product, quantity = 1, selectedVariants = null) => {
  try {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // Create a unique ID for the item (including variant if present)
    const variantString = selectedVariants
      ? `-${Object.values(selectedVariants).sort().join("-")}`
      : "";
    const itemId = `${product.id}${variantString}`;

    // Create the new item
    const cartItem = {
      id: itemId,
      productId: product.id,
      name: product.name,
      price: product.currentPrice || product.price,
      image: product.images?.[0]?.src || "/placeholder.jpg",
      quantity,
      variants: selectedVariants,
    };

    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex((item) => item.id === itemId);

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cartItems.push(cartItem);
    }

    // Save to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Update cart count
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("cartCount", totalItems.toString());

    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent(CART_UPDATE_EVENT, {
        detail: { totalItems },
      })
    );

    return totalItems;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return 0;
  }
};

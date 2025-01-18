import hoodieShipping from "../hoodieShippingData";
import tshirtShipping from "../shirtShippingData";

export const calculateShipping = (country, items) => {
  // Default to t-shirt rates if product type is not specified
  let totalShipping = 0;
  let deliveryTime = "";

  // Group items by product type (t-shirt vs hoodie)
  const groupedItems = items.reduce((acc, item) => {
    const type = item.type || "tshirt"; // Default to tshirt if not specified
    if (!acc[type]) acc[type] = 0;
    acc[type] += item.quantity;
    return acc;
  }, {});

  // Calculate shipping for each product type
  Object.entries(groupedItems).forEach(([type, quantity]) => {
    const rates = type === "hoodie" ? hoodieShipping : tshirtShipping;
    const countryRates = rates[country] || rates["FR"]; // Default to France rates if country not found

    if (quantity > 0) {
      totalShipping +=
        countryRates.basePrice + (quantity - 1) * countryRates.additionalPrice;

      // Keep the longest delivery time
      const currentDelivery = countryRates.delivery;
      if (
        !deliveryTime ||
        extractMaxDays(currentDelivery) > extractMaxDays(deliveryTime)
      ) {
        deliveryTime = currentDelivery;
      }
    }
  });

  return {
    cost: totalShipping,
    deliveryTime,
    isEU: isEUCountry(country),
  };
};

// Helper function to extract max days from delivery time string
const extractMaxDays = (deliveryTime) => {
  const match = deliveryTime.match(/(\d+)-(\d+)/);
  return match ? parseInt(match[2]) : 0;
};

// EU country checker
export const isEUCountry = (countryCode) => {
  const euCountries = [
    "AT",
    "BE",
    "BG",
    "HR",
    "CY",
    "CZ",
    "DK",
    "EE",
    "FI",
    "FR",
    "DE",
    "GR",
    "HU",
    "IE",
    "IT",
    "LV",
    "LT",
    "LU",
    "MT",
    "NL",
    "PL",
    "PT",
    "RO",
    "SK",
    "SI",
    "ES",
    "SE",
  ];
  return euCountries.includes(countryCode);
};

// Get all available countries with shipping
export const getAvailableCountries = () => {
  // Combine unique countries from both shipping types
  const countries = new Set([
    ...Object.keys(tshirtShipping),
    ...Object.keys(hoodieShipping),
  ]);

  return Array.from(countries).sort();
};

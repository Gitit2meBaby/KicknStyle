import hoodieShipping from "../hoodieShippingData";
import tshirtShipping from "../shirtShippingData";

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

export const calculateShipping = (country, items) => {
  // Add validation
  if (!country || !items?.length) {
    console.error("Missing required parameters:", { country, items });
    return {
      cost: 0,
      deliveryTime: "",
      isEU: false,
    };
  }

  let totalShipping = 0;
  let deliveryTime = "";

  // Group items by product type
  const groupedItems = items.reduce((acc, item) => {
    const type = item.type || "tshirt"; // Default to tshirt if not specified
    if (!acc[type]) acc[type] = 0;
    acc[type] += item.quantity;
    return acc;
  }, {});

  Object.entries(groupedItems).forEach(([type, quantity]) => {
    // Select shipping rates based on product type
    const rates = type.toLowerCase().includes("hoodie")
      ? hoodieShipping
      : tshirtShipping;

    // Get country rates with fallback to France
    const countryRates = rates[country] || rates["FR"];

    if (!countryRates) {
      console.error(`No shipping rates found for ${country}`);
      return;
    }

    if (quantity > 0) {
      totalShipping +=
        countryRates.basePrice + (quantity - 1) * countryRates.additionalPrice;

      // Update delivery time if longer
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

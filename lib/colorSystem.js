// Complete mapping of WooCommerce attribute values to Printful's English names
// Add this new function at the top of colorSystem.js
export const extractHexCode = (string) => {
  // Match 6-digit hex codes with or without # prefix
  const hexRegex = /#?([A-Fa-f0-9]{6})\b/;
  const match = string?.match(hexRegex);
  return match ? `#${match[1]}` : null;
};

// Update the getSwatchColor function to prioritize hex codes
export const getSwatchColor = (colorName, imageData = null) => {
  // First check if we have image data with a hex code
  if (imageData) {
    const imageTitle = imageData.name || imageData.title || imageData.alt || "";
    const hexFromTitle = extractHexCode(imageTitle);
    if (hexFromTitle) {
      return hexFromTitle;
    }
  }

  // If no hex code found, proceed with existing color mapping logic
  const variations = [
    colorName.toLowerCase().trim(),
    colorName.toLowerCase().trim().replace(/-/g, " "), // hyphen to space
    colorName.toLowerCase().trim().replace(/\s+/g, "-"), // space to hyphen
  ];

  // Try all variations of the color name
  for (const variant of variations) {
    if (colorSwatchValues[variant]) {
      return colorSwatchValues[variant];
    }
  }

  // Check if the colorName itself is a hex code
  const hexFromColor = extractHexCode(colorName);
  if (hexFromColor) {
    return hexFromColor;
  }

  // If no match found, return a default color
  console.warn(`No swatch color found for: ${colorName}`);
  return "#CCCCCC"; // Default gray as fallback
};

export const printfulColorMap = {
  // French to English
  noir: "black",
  blanc: "white",
  marine: "navy",
  "bleu marine": "navy",
  "french navy": "navy",
  "navy blazer": "navy",
  rouge: "red",
  vert: "green",
  jaune: "yellow",
  gris: "gray",
  rose: "pink",
  violet: "purple",
  marron: "brown",
  orange: "orange",
  "dark heather blue": "dark heather blue",
  "dark-heather-blue": "dark heather blue",
  "Dark-Heather-Blue": "dark heather blue",
  anthracite: "anthracite",
  stargazer: "stargazer",

  // Special/Custom colors (preserve as-is)
  "heather midnight navy": "heather midnight navy",
  "vintage black": "vintage black",
  "dark gray heather": "dark gray heather",
  storm: "storm",
  natural: "natural",
  charcoal: "charcoal",
  // Add more mappings as needed
};

// Visual representation for color swatches
export const colorSwatchValues = {
  // Basic colors
  noir: "#000000",
  blanc: "#FFFFFF",
  rouge: "#FF0000",
  vert: "#008000",
  bleu: "#0000FF",
  jaune: "#FFFF00",
  orange: "#FFA500",

  // Navy variations
  marine: "#000080",
  "bleu marine": "#000080",
  "french navy": "#192b3b",
  "navy blazer": "#232935",
  "heather midnight navy": "#1B366B",

  // Gray variations
  gris: "#808080",
  anthracite: "#383838",
  charcoal: "#36454F",
  storm: "#4F666A",

  // Special colors
  "Dark Heather Blue": "#667387",
  "Dark-Heather-Blue": "#667387",
  "dark-heather-blue": "#667387",
  stargazer: "#3f6d76",
  "vintage black": "#2F4F4F",
  "dark gray heather": "#4A4A4A",
  natural: "#F5F5DC",
  // Add more colors as needed
};

// Helper function to get printful color name
export const getPrintfulColorName = (wooColor) => {
  // First, normalize the input string
  const normalizedColor = wooColor.toLowerCase().trim().replace(/\s+/g, "-"); // Replace multiple spaces with single hyphens

  // If it exists in the map, normalize the mapped value too
  if (printfulColorMap[normalizedColor]) {
    return printfulColorMap[normalizedColor]
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");
  }

  // If no mapping exists, return the normalized input
  return normalizedColor;
};

// Helper function to determine if a color is dark (for text contrast)
export const isDarkColor = (colorName) => {
  const color = getSwatchColor(colorName);
  // If it's a hex color
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  }
  // Default to false for unknown colors
  return false;
};

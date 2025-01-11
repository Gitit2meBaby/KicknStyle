// Get all attributes
export async function getAttributes() {
  try {
    const { data } = await api.get("products/attributes");
    return data;
  } catch (error) {
    console.error("Error fetching attributes:", error);
    return [];
  }
}

// Get attribute terms (e.g., all sizes or all colors)
export async function getAttributeTerms(attributeId) {
  try {
    const { data } = await api.get(`products/attributes/${attributeId}/terms`, {
      per_page: 100,
    });
    return data;
  } catch (error) {
    console.error("Error fetching attribute terms:", error);
    return [];
  }
}

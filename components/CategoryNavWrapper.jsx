import {
  getCategories,
  getAttributes,
  getAttributeTerms,
} from "../lib/woocommerce";
import CategoryNav from "./CategoryNav";

// This is a server component that fetches the data
async function CategoryNavWrapper() {
  // Fetch data on the server side
  const categories = await getCategories();
  const attributes = await getAttributes();

  // Fetch all attribute terms in parallel
  const attributesWithTerms = await Promise.all(
    attributes.map(async (attribute) => {
      const terms = await getAttributeTerms(attribute.id);
      return {
        ...attribute,
        terms: terms.sort((a, b) => b.count - a.count),
      };
    })
  );

  // Filter out uncategorized and prepare the data
  const filteredCategories = categories.filter(
    (cat) => cat.slug !== "uncategorized"
  );

  return (
    <CategoryNav
      initialCategories={filteredCategories}
      initialAttributes={attributesWithTerms}
    />
  );
}

export default CategoryNavWrapper;

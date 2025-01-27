import React from "react";
import { generateMetadata } from "../../lib/generateMetadata";
import { CategoryProvider } from "../../context/CategoryContext";
import CategoryNavWrapper from "@/components/CategoryNavWrapper";

// export const metadata = generateMetadata(params.slug);

const ProductLayout = ({ children }) => {
  return (
    <main className="main-layout">
      <CategoryProvider>
        <aside className="aside">
          <CategoryNavWrapper />
        </aside>
        {children}
      </CategoryProvider>
    </main>
  );
};

export default ProductLayout;

import React from "react";
import { generateMetadata } from "../../lib/generateMetadata";
import CategoryNav from "@/components/CategoryNav";
import { CategoryProvider } from "../../context/CategoryContext";

// export const metadata = generateMetadata(params.slug);

const ProductLayout = ({ children }) => {
  return (
    <main className="main-layout">
      <CategoryProvider>
        <CategoryNav />
        {children}
      </CategoryProvider>
    </main>
  );
};

export default ProductLayout;

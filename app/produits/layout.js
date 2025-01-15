import React from "react";
import { generateMetadata } from "../../lib/generateMetadata";
import CategoryNav from "@/components/CategoryNav";

// export const metadata = generateMetadata(params.slug);

const ProductLayout = ({ children }) => {
  return (
    <main className="main-layout">
      <CategoryNav />
      {children}
    </main>
  );
};

export default ProductLayout;

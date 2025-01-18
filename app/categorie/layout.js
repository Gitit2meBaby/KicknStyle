import React from "react";

import CategoryNav from "@/components/CategoryNav";

import { CategoryProvider } from "../../context/CategoryContext";

const CategoryLayout = ({ children }) => {
  return (
    <main className="main-layout">
      <CategoryProvider>
        <CategoryNav />
        {children}
      </CategoryProvider>
    </main>
  );
};

export default CategoryLayout;

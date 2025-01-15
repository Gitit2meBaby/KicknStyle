import React from "react";

import CategoryNav from "@/components/CategoryNav";

const CategoryLayout = ({ children }) => {
  return (
    <main className="main-layout">
      <CategoryNav />
      <>{children}</>
    </main>
  );
};

export default CategoryLayout;

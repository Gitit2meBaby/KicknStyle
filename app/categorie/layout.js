import React from "react";

import { CategoryProvider } from "../../context/CategoryContext";
import CategoryNavWrapper from "../../components/CategoryNavWrapper";

const CategoryLayout = ({ children }) => {
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

export default CategoryLayout;

import CategoryNav from "@/components/CategoryNav";
import React from "react";

const CategoryLayout = ({ children }) => {
  return (
    <>
      <CategoryNav />
      {children}
    </>
  );
};

export default CategoryLayout;

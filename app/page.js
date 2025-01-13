import React from "react";

import Hero from "@/components/Hero";
import Info from "@/components/Info";
import HomeSliderWrapper from "@/components/HomeSliderWrapper";

const Page = async () => {
  return (
    <section>
      <Hero />
      <Info />
      <HomeSliderWrapper />
    </section>
  );
};

export default Page;

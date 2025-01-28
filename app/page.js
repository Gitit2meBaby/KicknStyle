import React from "react";

import Hero from "@/components/Hero";
import Info from "@/components/Info";
import HomeSliderWrapper from "@/components/HomeSliderWrapper";
import ScrollingBanner from "@/components/ScrollingBanner";

const Page = async () => {
  return (
    <section>
      <Hero />
      <ScrollingBanner />
      <Info />
      <HomeSliderWrapper />
    </section>
  );
};

export default Page;

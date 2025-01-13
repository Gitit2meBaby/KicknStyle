"use client";
import React from "react";
import Slider from "react-slick";
import Link from "next/link";

import Slide from "./Slide";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/homeSlider.module.css";

const HomeSlider = ({ categories }) => {
  console.log("Categories received:", categories); // Debugging

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (!categories?.length) {
    console.log("No categories found"); // Debugging
    return null;
  }

  return (
    <section className={styles.sliderSection}>
      <Slider {...settings}>
        {categories.map((category) => (
          <Link
            href={`/category/${category.slug}`}
            key={category.id}
            className={styles.slideLink}
          >
            <Slide category={category} />
          </Link>
        ))}
      </Slider>
    </section>
  );
};

export default HomeSlider;

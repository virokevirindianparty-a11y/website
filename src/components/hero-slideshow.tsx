"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = Array.from({ length: 7 }, (_, i) => `/images/slideshow/${i + 1}.webp`);
const INTERVAL_MS = 5000;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          className={`object-contain transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-60" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}

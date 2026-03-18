"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProductGallery({ galleryImages, imageAlt, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (galleryImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <section className="mt-8 md:mt-12">
      {/* Desktop: side-by-side images when there are multiple */}
      <div className="hidden gap-8 md:grid md:grid-cols-2 lg:gap-10">
        {galleryImages.map((src, index) => (
          <div
            key={src + index}
            className="relative aspect-square overflow-hidden rounded-xl bg-[var(--surface-cream)]"
          >
            <Image
              src={src}
              alt={imageAlt || title || "Product image"}
              fill
              sizes="(max-width: 1024px) 50vw, 480px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Mobile: image slider with pagination dots */}
      <div className="md:hidden">
        <div className="relative overflow-hidden rounded-xl bg-[var(--surface-cream)]">
          {/* Slider track */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {galleryImages.map((src, index) => (
              <div
                key={src + index}
                className="relative aspect-[4/5] min-w-full overflow-hidden"
              >
                <Image
                  src={src}
                  alt={imageAlt || title || "Product image"}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {galleryImages.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-[var(--foreground)]"
                    : "bg-[var(--foreground)]/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

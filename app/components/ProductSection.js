"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const transition = { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] };
const imageVariants = {
  off: { opacity: 0, x: -32 },
  on: { opacity: 1, x: 0 },
};
const contentVariants = {
  off: { opacity: 0, x: 32 },
  on: { opacity: 1, x: 0 },
};

/**
 * Reusable product showcase section with scroll and hover animations.
 */
export default function ProductSection({
  title,
  description,
  imageSrc,
  imageAlt,
  slug,
  isSculpture = false,
  renderWrapper = true,
  backgroundClass = "bg-[var(--surface-cream)]",
  underlineTitle = false,
}) {
  const content = (
    <div className="mx-auto max-w-7xl px-6 py-16 md:flex md:items-end md:gap-3 md:py-20 lg:gap-4">
      {/* Image column - slides in from left; full-bleed + larger aspect on mobile */}
      <motion.div
        className="-mx-6 mb-4 flex justify-center flex-1 md:mx-0 md:mb-0 md:max-w-[48%]"
        initial="off"
        whileInView="on"
        viewport={{ once: true, margin: "-80px" }}
        variants={imageVariants}
        transition={transition}
      >
        <motion.div
          className="relative aspect-[4/3] h-[350px] md:h-[450px] overflow-hidden rounded-none md:aspect-square md:rounded-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt || "Product"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          ) : (
            <div
              className="h-full w-full bg-[var(--surface-cream)]"
              aria-hidden
            />
          )}
        </motion.div>
      </motion.div>

      {/* Content column - slides in from right */}
      <motion.div
        className="flex flex-1 flex-col items-center justify-end  text-center md:items-start md:text-left"
        initial="off"
        whileInView="on"
        viewport={{ once: true, margin: "-80px" }}
        variants={contentVariants}
        transition={transition}
      >
        <h2
          className="text-xl font-bold text-[var(--text-dark)] md:text-2xl lg:text-[24px]"
        >
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-[14px] font-light leading-[30px] text-[#524F4F] md:mt-3 md:text-[16px]">
          {description}
        </p>
        <div className="mt-8 flex w-full flex-row justify-center gap-3 sm:gap-4 md:justify-start md:mt-10">
          {/* Become a Collector comes first, text is white, bg is #A08B6D, no border radius */}
          <motion.div className={`flex ${isSculpture && slug ? "flex-1" : "w-full"} max-w-[200px] md:max-w-[240px]`} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="https://wa.me/2349153081531?text=Hello%2CEmi%20Igi%20.%20I%20would%20like%20to%20inquire%20about%20a%20commission%20for%20your%20work%E2%80%A6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full aspect-[145/35] items-center justify-center rounded-none bg-[#A08B6D] px-2 text-center text-[11px] xs:text-xs sm:text-sm md:text-[15px] font-medium text-white shadow-md ring-1 ring-black/5 transition-colors hover:bg-[var(--accent-brown-light)]"
            >
              Become a Collector
            </Link>
          </motion.div>

          {/* See description comes second, bg is #FFFFFF (white), text is black, no border radius */}
          {isSculpture && slug && (
            <motion.div className="flex flex-1 max-w-[200px] md:max-w-[240px]" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={`/pieces/${slug}`}
                className="flex w-full aspect-[145/35] items-center justify-center rounded-none bg-white px-2 py-5 text-center text-[11px] xs:text-xs sm:text-sm md:text-[15px] font-medium text-black shadow-sm ring-1 ring-black/10 transition-all hover:bg-black/5 hover:ring-black/20"
              >
                See description
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );

  if (renderWrapper) {
    return <section className={backgroundClass}>{content}</section>;
  }
  return content;
}

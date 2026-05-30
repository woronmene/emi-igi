"use client";

import { useEffect, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const buttonMotionClass =
  "flex w-full aspect-[135/45] md:aspect-[145/35] items-center justify-center rounded-none px-2 text-center text-[11px] xs:text-xs sm:text-sm md:text-[15px] font-medium transition-transform duration-150 active:scale-[0.98] hover:scale-[1.03]";

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
  isArtMarket = false,
  renderWrapper = true,
  backgroundClass = "bg-[#E1D7C6]",
  underlineTitle = false,
}) {
  const router = useRouter();
  const [isNavigating, startNavigation] = useTransition();
  const pieceHref = slug ? `/pieces/${slug}` : null;

  useEffect(() => {
    if (isSculpture && pieceHref) {
      router.prefetch(pieceHref);
    }
  }, [isSculpture, pieceHref, router]);
  const content = (
    <div className="mx-auto max-w-7xl px-6 py-16 md:flex md:items-end md:gap-3 md:py-20 lg:gap-4">
      {/* Image column - slides in from left; full-bleed + larger aspect on mobile */}
      <motion.div
        className="-mx-6 mb-[12px] flex justify-center flex-1 md:mx-0 md:mb-0 md:max-w-[48%]"
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
          className="text-[13px] font-bold text-[var(--text-dark)] md:text-2xl lg:text-[24px]"
        >
          {title}
        </h2>
        <p
          className={`mt-4 max-w-xl text-[11px] font-light leading-[20px] md:mt-3 md:text-[16px] md:leading-[52px] ${
            isArtMarket ? "text-[#808080]" : "text-[#524F4F]/80"
          }`}
        >
          {description}
        </p>
        <div className="mt-8 flex w-full flex-row justify-center gap-3 sm:gap-4 md:justify-start md:mt-10">
          <Link
            href="https://wa.me/2349153081531?text=Hello%2CEmi%20Igi%20.%20I%20would%20like%20to%20inquire%20about%20a%20commission%20for%20your%20work%E2%80%A6"
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonMotionClass} ${isSculpture && pieceHref ? "flex-1 max-w-[200px] md:max-w-[240px]" : "w-full max-w-[200px] md:max-w-[240px]"} bg-[#A08B6D] font-medium text-white shadow-md ring-1 ring-black/5 hover:bg-[var(--accent-brown-light)]`}
          >
            Become a Collector
          </Link>

          {isSculpture && pieceHref && (
            <Link
              href={pieceHref}
              prefetch={true}
              aria-busy={isNavigating}
              onClick={(event) => {
                if (
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey ||
                  event.button !== 0
                ) {
                  return;
                }
                event.preventDefault();
                startNavigation(() => {
                  router.push(pieceHref);
                });
              }}
              className={`${buttonMotionClass} flex-1 max-w-[200px] md:max-w-[240px] bg-white font-medium text-black shadow-sm ring-1 ring-black/10 hover:bg-black/5 hover:ring-black/20 ${isNavigating ? "pointer-events-none opacity-70" : ""}`}
            >
              {isNavigating ? "Opening…" : "See description"}
            </Link>
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

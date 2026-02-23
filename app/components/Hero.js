"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};
const transition = { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] };

export default function Hero() {
  return (
    <section className="relative min-h-[55vh] w-full pt-[var(--navbar-height)] -mt-[var(--navbar-height)] md:min-h-[90vh] overflow-hidden bg-black">
      {/* Portrait video centered; black shows on left/right */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-contain"
          aria-hidden
        >
          <source src="/emi-igi-vid.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Content - staggered reveal */}
      <div className="absolute z-10 flex flex-col items-center justify-center bottom-22 left-1/2 -translate-x-1/2">
        <motion.h1
          className="text-center text-5xl font-semibold tracking-tight text-[var(--text-light)] drop-shadow-lg md:text-7xl lg:text-8xl"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={transition}
        >
          ÈMÍ-ÌGI
        </motion.h1>
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ ...transition, delay: 0.2 }}
        >
          <Link
            href="https://wa.me/2349153081531?text=Hi%20Emi-igi%2C%20I%20would%20like%20to%20speak%20about%20a%20commission%20of%20one%20of%20the%20pieces"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-[14px] border-2 border-[#FAFAFA]/[0.69] bg-[#FFFFFF]/[0.39] flex items-center justify-center text-center w-[400px] py-4 text-base text-[#FFFFFF] transition-all hover:bg-[#FFFFFF]/[0.5] md:mt-10 md:py-8 md:text-[24px]"
          >
            <span>Become Collector</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

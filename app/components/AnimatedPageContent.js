"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};
const transition = { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] };

export default function AnimatedPageContent({ title, children }) {
  return (
    <div className="mx-auto max-w-3xl px-6 text-center">
      <motion.h1
        className="font-sans text-3xl font-semibold underline text-[var(--text-dark)] md:text-4xl"
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={transition}
      >
        {title}
      </motion.h1>
      <motion.div
        className="mt-16 text-md leading-relaxed font-light text-[var(--text-dark)]"
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ ...transition, delay: 0.15 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

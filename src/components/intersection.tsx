"use client";

import React, { ReactNode } from "react";

import { motion } from "framer-motion";

interface IntersectionProps {
  children: ReactNode;
  className?: string;
}

export default function Intersection({
  children,
  className,
}: IntersectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

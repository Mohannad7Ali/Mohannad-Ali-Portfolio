"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getPersonalInfo } from "@/lib/config";

export default function Loading() {
  const personalInfo = getPersonalInfo();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Spinner */}
        <div className="relative">
          {/* Outer glow circle */}
          <motion.div
            className="h-20 w-20 rounded-full border border-primary/20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main rotating ring */}
          <motion.div
            className="absolute top-0 left-0 h-20 w-20 rounded-full border-4 border-primary/30"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Accent rotating ring */}
          <motion.div
            className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-4 border-r-4 border-primary"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Text (branding) */}
        <motion.p
          className="text-sm text-muted-foreground tracking-widest uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {personalInfo.name}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}

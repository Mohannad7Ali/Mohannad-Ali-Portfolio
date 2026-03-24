"use client";

import { motion } from "framer-motion";
import { getPersonalInfo, getSocialLinks } from "@/lib/config";
import { ArrowDown } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import * as Icons from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export function HeroSection() {
  const personalInfo = getPersonalInfo();
  const socials = getSocialLinks();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
  };

  // إعدادات الحركة للنصوص (Stagger Children)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-12 px-6 overflow-hidden md:flex-row md:justify-between max-w-7xl mx-auto">
      {/* 1. الجانب النصي (Text & Content) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 text-center md:text-left z-10"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2"
        >
          Hi, I&apos;m <span className="text-primary">{personalInfo.name}</span>
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl text-muted-foreground font-semibold mb-6"
        >
          {personalInfo.title}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto md:mx-0 leading-relaxed mb-8"
        >
          {personalInfo.bio}
        </motion.p>

        {/* أزرار الدعوة للإجراء (CTA Buttons) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 justify-center md:justify-start mb-10"
        >
          <ButtonLink
            href="/#projects"
            className="px-8 py-6 text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
          >
            View My Work
          </ButtonLink>
          <ButtonLink
            href="/#contact"
            variant="outline"
            className="px-8 py-6 text-lg hover:scale-105 transition-all duration-300 hover:bg-primary/5"
          >
            Get In Touch
          </ButtonLink>
        </motion.div>

        {/* أيقونات التواصل الاجتماعي */}
        <motion.div
          variants={itemVariants}
          className="flex gap-5 justify-center md:justify-start"
        >
          {socials.map((social) => {
            const IconComponent = Icons[
              social.icon as keyof typeof Icons
            ] as LucideIcon;
            return (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-border bg-background/50 text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                {IconComponent && <IconComponent className="h-5 w-5" />}
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>

      {/* 2. الجانب البصري (Profile Image with Effects) */}
      <div className="flex-1 mt-16 md:mt-0 flex justify-center md:justify-end relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          {/* تأثير التوهج الخلفي (Backglow) */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

          {/* حاوية الصورة مع الحدود المتدرجة */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-[4px] bg-gradient-to-tr from-primary via-primary/20 to-primary shadow-2xl">
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background">
              <Image
                src="/images/profile.jpg" // تأكد من المسار الصحيح
                alt={personalInfo.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
            </div>
          </div>

          {/* تأثير النبض الدائري (Glow Ring) */}
          <div className="absolute inset-0 rounded-full ring-4 ring-primary/20 animate-ping opacity-20 pointer-events-none"></div>
        </motion.div>
      </div>

      {/* 3. سهم التمرير لأسفل (Scroll Indicator) */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs uppercase tracking-widest font-medium">
            Scroll
          </span>
          <ArrowDown className="h-5 w-5" />
        </button>
      </motion.div>
    </section>
  );
}

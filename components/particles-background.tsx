"use client";

import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; //
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { getThemeByName } from "@/lib/config";

export function ParticlesBackground() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [particleConfig, setParticleConfig] = useState<ISourceOptions | null>(
    null,
  );

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !theme) return;

    try {
      const currentTheme = getThemeByName(theme === "system" ? "light" : theme);

      if (!currentTheme) return;

      const config = currentTheme.particleConfig;

      setParticleConfig({
        particles: {
          number: {
            value: config.particleCount,
            density: { enable: true, area: 800 },
          },
          color: { value: config.color },
          shape: { type: config.shape },
          opacity: { value: config.opacity },
          size: { value: config.size, random: true },
          links: {
            // ✅ updated API
            enable: config.linked,
            distance: 150,
            color: config.linkColor,
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: config.speed,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
        },
        detectRetina: true,
        fpsLimit: 60,
        fullScreen: { enable: true, zIndex: -1 },
      });
    } catch (error) {
      console.error("Particles error:", error);
    }
  }, [mounted, theme]);

  if (!mounted || !particleConfig) return null;

  return (
    <Particles id="tsparticles" init={particlesInit} options={particleConfig} />
  );
}

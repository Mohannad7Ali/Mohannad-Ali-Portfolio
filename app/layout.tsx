import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { ParticlesBackground } from "@/components/particles-background";
import { Footer } from "@/components/footer";
import { getPersonalInfo } from "@/lib/config";
import { Toaster } from "@/components/ui/toaster";
import { LoadingAnimation } from "@/components/loading-animation";
import { ScrollIndicator } from "@/components/scroll-indicator";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", //  prevent font blocking
});

//  safe metadata generation
export const metadata: Metadata = (() => {
  const personalInfo = getPersonalInfo();

  return {
    title: `${personalInfo?.name || "Portfolio"} - ${personalInfo?.title || ""}`,
    description: personalInfo?.bio || "Personal portfolio website",
  };
})();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personalInfo = getPersonalInfo(); // scoped safely

  return (
    <html lang="en" suppressHydrationWarning>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <body
        className={`${inter.className} bg-background text-foreground `}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* UI Effects */}
          <ParticlesBackground />
          <LoadingAnimation />

          {/* Layout */}
          <Navbar />
          <ScrollIndicator />

          <main className="min-h-screen">{children}</main>

          <Footer />

          {/* Global UI */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import CursorGlow from "@/components/ui/CursorGlow";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OmniMind AI - Autonomous Multi-Agent AI Platform",
  description:
    "Transform complex problems into structured solutions using collaborative AI agents. Get verified knowledge, scenario simulations, and consensus-driven recommendations.",
  keywords:
    "AI, artificial intelligence, multi-agent, decision making, simulation, automation",
  authors: [{ name: "OmniMind AI Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <CursorGlow />
          <div className="min-h-screen mesh-gradient text-[var(--text-primary)]">
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "rgba(15, 15, 15, 0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "16px",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                },
                success: {
                  iconTheme: {
                    primary: "#ffffff",
                    secondary: "#000000",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#ffffff",
                  },
                },
              }}
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

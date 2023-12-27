import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/Providers/ThemeProvider";
import Header from "@/components/Header/Header";
import Container from "@/components/ui/Container";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "@/components/ui/toaster";
import TanstackProvider from "@/Providers/TanstackProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Padel Blitz",
  description: "Created By Andres Aguirre",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        suppressHydrationWarning
        className={`${GeistSans.variable} ${GeistMono.variable} mb-16 h-full bg-background`}
        lang="en"
      >
        <body
          suppressHydrationWarning
          className={`${inter.className} h-full bg-background`}
        >
          <TanstackProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <TooltipProvider>
                <Toaster />
                <Container>
                  <Header />
                  {children}
                </Container>
              </TooltipProvider>
            </ThemeProvider>
          </TanstackProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

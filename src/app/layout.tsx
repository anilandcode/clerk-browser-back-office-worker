import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clerk - Browser Back-Office Worker",
  description:
    "A supervised browser worker for repetitive legacy workflows with approvals, policy checks, and audit trails.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-[100dvh] flex bg-[var(--color-surface)]">
        <div className="noise-overlay" aria-hidden="true" />
        <Sidebar />
        <main className="flex-1 lg:ml-60 min-h-[100dvh]">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-8 lg:py-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

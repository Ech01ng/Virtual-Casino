/*
 - Root Layout Component
 - This is the main layout wrapper for the entire application.
 - It provides the basic HTML structure and global configurations.
*/

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Initialize the Inter font from Google Fonts
// This will be applied to all text in the application
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the application
// This information is used for SEO and browser tabs
export const metadata: Metadata = {
  title: "Virtual Casino",
  description: "Experience the thrill of casino games from the comfort of your home",
};

/*
 - RootLayout Component
 - @param {Object} props - Component props
 - @param {React.ReactNode} props.children - Child components to be rendered
 - @returns {JSX.Element} The root layout with HTML structure
*/
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
} 
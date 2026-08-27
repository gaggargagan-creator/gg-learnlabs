import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "GG LearnLabs", description: "Practical tools for Learning & Development professionals" };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}

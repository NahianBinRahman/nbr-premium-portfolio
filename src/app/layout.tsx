import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nahian DeepTech | AI Systems, Autonomous Agents & Full-Stack Development",
  description:
    "Official website of Nahian DeepTech, founded by Nahian Bin Rahman. Building turnkey AI systems, autonomous agent workflows, high-converting digital platforms, and enterprise automation.",
  keywords: [
    "Nahian DeepTech",
    "Nahian Bin Rahman",
    "Nahian",
    "AI Agency",
    "AI Engineer",
    "Autonomous Agents",
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js",
    "TypeScript",
    "Python",
    "Machine Learning",
    "Business Automation",
    "Portfolio",
  ],
  authors: [{ name: "Nahian Bin Rahman", url: "https://github.com/NahianBinRahman" }],
  creator: "Nahian Bin Rahman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/NahianBinRahman",
    title: "Nahian Bin Rahman | AI Engineer & Full-Stack Developer",
    description:
      "Futuristic AI Engineer Command Center & Portfolio for Nahian Bin Rahman.",
    siteName: "Nahian Bin Rahman Portfolio",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/52718410?v=4",
        width: 400,
        height: 400,
        alt: "Nahian Bin Rahman",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nahian Bin Rahman | AI Engineer & Full-Stack Developer",
    description:
      "Futuristic AI Engineer Command Center & Portfolio for Nahian Bin Rahman.",
    creator: "@nahianx11",
    images: ["https://avatars.githubusercontent.com/u/52718410?v=4"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-space-950 text-slate-100 antialiased selection:bg-cyber-cyan selection:text-space-950">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { PlatformProvider } from "@/context/PlatformContext";

export const metadata: Metadata = {
  title: "GIATMARA SkillsHub | Direktori Kemahiran & Usahawan Teknikal Malaysia",
  description:
    "Platform direktori kemahiran dan pengiklanan servis pelatih serta lepasan GIATMARA di seluruh Malaysia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">
        <PlatformProvider>{children}</PlatformProvider>
      </body>
    </html>
  );
}

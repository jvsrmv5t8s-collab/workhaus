import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AIPanel from "@/components/AIPanel";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coworking and Shared Office Space in Canada | Workhaus",
  description:
    "Flexible office spaces designed to help you work productively, collaborate effectively, and achieve more. Proudly Canadian-owned and operated.",
  icons: {
    icon: "/Favicon_WH.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body
        style={{
          fontFamily:
            "var(--font-jakarta), ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
        className="min-h-screen"
      >
        {children}
        <AIPanel />
      </body>
    </html>
  );
}

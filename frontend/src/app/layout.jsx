import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./auth-animations.css";
import Providers from "./provider";
import Header from "@/components/common/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Page",
  description: "Simple Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}
      >
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
            <Header />
            <main className="w-full">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
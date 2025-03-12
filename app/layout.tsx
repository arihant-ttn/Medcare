import type { Metadata } from "next";
import { Geist, Geist_Mono , Montserrat} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
<style>

</style>
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      
      <body className={`${geistSans.variable} ${geistMono.variable} ${geistMono.montserrat}`}>
      <Navbar/>
        {children}
      </body>
    </html>
  );
}

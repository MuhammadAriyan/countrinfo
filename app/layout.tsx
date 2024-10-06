import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SearchBar from "@/components/searchBar";
import { HeartIcon } from "@radix-ui/react-icons";
import {Flame, Github , Instagram, Linkedin} from "lucide-react";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Countrinfo",
  description: "GET ANY COUNTRY INFO...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <SearchBar/>
        {children}
        <div>
        <div className="break-words whitespace-normal font-sans p-4 sm:p-6 flex flex-col sm:flex-row justify-center items-center rounded-lg ">
  <span className="text-sm sm:text-base">Made With</span>
  <HeartIcon className="ml-1 mr-1 w-3 h-3 sm:w-6 sm:h-6 relative hover:text-red-600" />
  <span className="text-sm sm:text-base">By Muhammad Aryan</span>
  <Flame className="ml-2 w-3 h-3 sm:w-6 sm:h-6 hover:fill-yellow-600" />
</div>
<div className="rounded-md justify-center content-center flex">
<Link href='https://github.com/MuhammadAriyan/' className="  p-1"><Github/></Link>
<Link href='https://www.linkedin.com/in/muhammad-aryan' className="  p-1"><Linkedin/></Link>
<Link href='https://www.instagram.com/maryanrar?igsh=MnVxN2lkMGpiZG9s' className="  p-1"><Instagram/></Link>
</div>
</div>
      </body>
    </html>
  );
}

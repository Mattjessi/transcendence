import React from "react";
import type { Metadata } from "next";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import "/public/styles/styles.css";

export const metadata: Metadata = {
  title: "Super Pong",
  description: "Super Pong is an online gaming platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="scrollbar"
      lang="en"
    >
      <body>
        <header>
          <Navbar/>
        </header>
        <main>
          {children}
        </main>
        <footer>
          <Footer/>
        </footer>
      </body>
    </html>
  );
}
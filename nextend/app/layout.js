"use client"

import React, { useEffect, useState } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from 'next/navigation';
import "./globals.css";
import MyAppBar from './components/MyAppBar';
import Footer from './components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Layout = ({ children }) => {
  const pathname = usePathname();
  const showAppBar = !pathname.startsWith('/admin');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <div>
      {showAppBar && <MyAppBar toggleTheme={toggleTheme} darkMode={darkMode} />}
      {children}
      {showAppBar && <Footer />}
    </div>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black dark:text-white`}>
          <Layout>
            {children}
          </Layout>
      </body>
    </html>
  );
}

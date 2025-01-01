"use client"

import React from 'react';
import Link from 'next/link';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

function MyAppBar({ toggleTheme, darkMode }) {
  const scrollToEnd = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="grid grid-cols-3 pt-4">
      <div className="text-xl w-fit cursor-pointer pl-4 justify-self-start">&#9776;</div>
      <div className="space-x-4 justify-self-center">
        <Link href='/'>Home</Link>
        <Link href="/blogs">Blogs</Link>
        <span className="cursor-pointer" onClick={scrollToEnd}>About</span>
        <span className="cursor-pointer">Contact</span>
      </div>
      <div className="grid grid-cols-2 w-fit justify-self-end space-x-4 pr-4">
        <Link href='/admin' className='justify-self-center'> admin </Link>
        <button onClick={toggleTheme} className="justify-self-center">
          {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}

export default MyAppBar;


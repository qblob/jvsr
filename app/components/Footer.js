"use client"

import React from 'react';

const Footer = () => {
  return (
    <footer className="grid grid-cols-2 p-4 mt-96 dark:bg-black dark:text-white">
      <div id="about" className="mb-8">
        <h2 className="text-2xl font-bold">About Us</h2>
        <p className="mt-2">
          We are a team of passionate developers dedicated to creating the best web applications. Our mission is to deliver high-quality software solutions that meet the needs of our clients.
        </p>
      </div>
      <div id="contact" className="mb-8">
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <p className="mt-2">
          If you have any questions or inquiries, feel free to reach out to us at:
        </p>
        <p className="mt-2">
          Email: contact@tekee.com
        </p>
        <p className="mt-2">
          Phone: +98 912 708 8209
        </p>
      </div>
    </footer>
  );
};

export default Footer;


"use client";

import React from 'react';

// Live links to your design projects
const designs = [
  { name: "Transformers", url: "https://example-transformers.com", color: "from-blue-500/20" },
  { name: "Spider-man", url: "https://example-spiderman.com", color: "from-red-500/20" },
  { name: "Ice Cream", url: "https://example-icecream.com", color: "from-pink-500/20" },
  { name: "Mouse", url: "https://example-mouse.com", color: "from-gray-500/20" }
];

export default function Footer() {
  return (
    // Gradient background inspired by image
    <footer className="relative w-full bg-black flex flex-col items-center pt-32 pb-12 overflow-hidden z-10 bg-gradient-to-b from-black to-gray-950">
      
      {/* Separator line and multi-gallery cards section are identical to previous footer response */}
      
      {/* Branding with Spaced-out look and your exact name */}
      <div className="relative z-10 w-full max-w-6xl px-8 flex justify-end">
        <p className="text-white/40 text-sm font-mono tracking-[0.2em] uppercase">
          © @peddisetti surya
        </p>
      </div>

    </footer>
  );
}

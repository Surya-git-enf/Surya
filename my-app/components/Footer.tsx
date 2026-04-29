
"use client";

import React from 'react';

export default function Footer() {
  const designs = [
    { name: "Transformers", color: "from-blue-500/20" },
    { name: "Spider-man", color: "from-red-500/20" },
    { name: "Ice Cream", color: "from-pink-500/20" },
    { name: "Mouse", color: "from-gray-500/20" }
  ];

  return (
    <footer className="relative w-full bg-black flex flex-col items-center pt-32 pb-12 overflow-hidden z-10">
      
      {/* Subtle bottom background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[300px] bg-white/5 rounded-[100%] blur-[120px] pointer-events-none" />

      {/* 3D Gallery Links Section */}
      <div className="relative z-10 max-w-7xl w-full px-8 mb-32 flex flex-col items-center">
        <h2 className="text-[3vw] md:text-5xl font-light text-white mb-16 tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          Visit my <span className="font-bold">3D Designs</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
          {designs.map((item, index) => (
            <button 
              key={index}
              className="group relative h-40 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              {/* Internal Hover Gradient */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t ${item.color} to-transparent transition-opacity duration-700`} />
              
              {/* Text */}
              <span className="absolute bottom-6 left-6 text-gray-400 font-medium tracking-widest uppercase text-sm group-hover:text-white transition-colors duration-500">
                {item.name}
              </span>
              
              {/* Arrow Icon that slides in on hover */}
              <svg 
                className="absolute top-6 right-6 w-6 h-6 text-white opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="5" y1="19" x2="19" y2="5"></line><polyline points="10 5 19 5 19 14"></polyline>
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* The Separator Line (Fading cinematic edge) */}
      <div className="w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />
      
      {/* Socials & Copyright */}
      <div className="relative z-10 w-full max-w-6xl px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Social SVGs */}
        <div className="flex gap-4">
          {/* WhatsApp */}
          <a href="#" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
          {/* Instagram */}
          <a href="#" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          {/* Discord */}
          <a href="#" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6A16 16 0 0 0 6 6"/><path d="M12 19l-2-2m4 0l-2 2"/></svg>
          </a>
        </div>

        {/* Branding */}
        <p className="text-white/40 text-sm font-mono tracking-[0.2em] uppercase">
          © @peddisetti surya
        </p>
      </div>

    </footer>
  );
}

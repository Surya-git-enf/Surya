
"use client";

import React from "react";

// FOOTER DESIGNS DATA
const footerDesigns = [
  {
    id: 1,
    name: "Transformers - Optimus prime",
    imgSrc: "/transformers.png",
    link: "https://playfulport.vercel.app/",
  },
  {
    id: 2,
    name: "Amazing spider man",
    imgSrc: "/spiderman.png",
    link: "https://spiderman-three-iota.vercel.app/",
  },
  {
    id: 3,
    name: "Cream store",
    imgSrc: "/cream.png",
    link: "https://creamstore-demo.vercel.app/", //Placeholder link
  },
  {
    id: 4,
    name: "Playful - AI powered game engine",
    imgSrc: "/logo.png",
    link: "https://playfulport.vercel.app/", //Shared Placeholder link
  },
];

// SOCIAL LINKS DATA
const socialLinks = [
  {
    name: "Instagram",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.065.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 9a3 3 0 110 6 3 3 0 010-6z" />
      </svg>
    ),
    link: "https://www.instagram.com/surya3ddev?igsh=bDIzODRjY2E0dG95",
  },
  {
    name: "Linkedin",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.5 16V9.5a1.5 1.5 0 000 3v3h1.5zm6.5 0V9.5a1.5 1.5 0 000 3v3h1.5zm-5.5 1.5V17a.5.5 0 011 0v.5a.5.5 0 01-1 0zm3.5 0V17a.5.5 0 011 0v.5a.5.5 0 01-1 0zM12 8.5a1.5 1.5 0 10-1.5 1.5A1.5 1.5 0 0012 8.5z" />
      </svg>
    ),
    link: "https://www.linkedin.com/in/surisurya-undefined-9113b829b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    name: "Discord",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515a.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0a12.64 12.64 0 00-.617-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 004.68 4.37a.071.071 0 00-.032.027C1.504 9.125 0.639 13.755 1.057 18.263a.072.072 0 00.03.056c2.127 1.56 4.191 2.507 6.213 3.137a.077.077 0 00.084-.027c.48-.654.9-1.347 1.254-2.078a.073.073 0 00-.04-.103c-.708-.268-1.38-.6-2.024-.985a.074.074 0 01-.008-.123c.142-.107.284-.218.421-.33a.074.074 0 01.078-.01c4.082 1.868 8.508 1.868 12.512 0a.074.074 0 01.078.01c.137.111.279.223.421.33a.074.074 0 01-.008.123c-.645.385-1.317.717-2.024.985a.073.073 0 00-.04.103c.354.73.774 1.424 1.254 2.078a.076.076 0 00.084.028c2.022-.63 4.086-1.577 6.213-3.137a.072.072 0 00.03-.056C23.36 12.78 22.185 8.163 20.317 4.37zM8.02 15.33c-1.182 0-2.156-1.085-2.156-2.419c0-1.333.955-2.418 2.156-2.418c1.21 0 2.175 1.085 2.156 2.418c0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.182 0-2.156-1.085-2.156-2.419c0-1.333.955-2.418 2.156-2.418c1.21 0 2.175 1.085 2.156 2.418c0 1.334-.946 2.419-2.156 2.419z" />
      </svg>
    ),
    link: "https://discord.com/users/ayrus0101",
  },
  {
    name: "WhatsApp",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.001 5.45-4.436 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.029c0 2.119.549 4.188 1.591 6.019L0 24l6.135-1.61a11.771 11.771 0 005.915 1.594h.005c6.637 0 12.032-5.393 12.035-12.029a11.762 11.762 0 00-3.417-8.567l.001-.001z" />
      </svg>
    ),
    link: "https://wa.me/", // Shared Placeholder link
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-white text-gray-900 pt-20 pb-12 overflow-hidden border-t border-gray-100">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-gray-100 to-white z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Carousel Heading - Optional or integrate with prompt visual */}
        <h2 className="text-[2.8vw] font-bold tracking-tight text-gray-950 mb-10 pl-4">
          RECENT CREATIONS
        </h2>

        {/* 3D Rotating Carousel Container (Light Theme Olive Look) */}
        <div className="flex items-center justify-center h-[350px] mb-20 overflow-visible preserve-3d">
          <div className="w-full flex gap-10">
            {footerDesigns.map((design, index) => (
              <a
                key={design.id}
                href={design.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block flex-none w-[280px] h-[350px] rounded-3xl border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(100,110,60,0.12)] hover:border-olive-300 transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-4"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(162,175,108,0.2), rgba(255,255,255,1))",
                }}
              >
                {/* 80% Image */}
                <div className="w-full h-[80%] p-6 flex justify-center items-center overflow-hidden rounded-t-3xl bg-gray-100 border-b border-gray-200">
                  <img
                    src={design.imgSrc}
                    alt={design.name}
                    className="max-w-[80%] max-h-full object-contain"
                  />
                </div>
                {/* 20% White Bold Heading */}
                <div className="w-full h-[20%] p-6 flex items-center bg-white rounded-b-3xl">
                  <h3 className="text-xl font-bold text-gray-950 leading-tight">
                    {design.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Bottom Bar (Socials & Username) */}
        <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 hover:text-gray-950 transition-colors duration-300 shadow-[0_5px_15px_rgba(0,0,0,0.03)]"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* User Username with link (dynamic extend as requested) */}
          <div className="text-center md:text-right">
            <a
              href="https://discord.com/users/ayrus0101" // Extendusername as link redirect to discord
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-mono tracking-wider font-bold text-gray-900 hover:text-gray-600 transition-colors"
            >
              @surya3ddev <span className="font-normal text-gray-400">| ayrus0101</span>
            </a>
            <p className="text-sm text-gray-500 mt-1">© 2026 Surya Peddishetti. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

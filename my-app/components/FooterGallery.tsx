"use client";

export default function FooterGallery() {
  const designs = ["Transformers", "Spider-man", "Ice Cream", "Mouse"];

  return (
    <section className="w-full bg-black py-24 flex flex-col items-center">
      
      {/* 3D Gallery Section */}
      <div className="max-w-5xl w-full px-6 mb-32">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Visit my 3D designs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {designs.map((item, index) => (
            <button 
              key={index}
              className="group relative h-32 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/30"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-white/10 to-transparent transition-opacity duration-500" />
              <span className="relative z-10 text-gray-300 font-medium tracking-wide group-hover:text-white transition-colors">{item}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Line & Socials */}
      <div className="max-w-6xl w-full px-6 flex flex-col items-center">
        <div className="w-full h-[1px] bg-white/10 mb-10" />
        
        <div className="flex gap-6 mb-8">
          {/* WhatsApp */}
          <a href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
          {/* Instagram */}
          <a href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          {/* Discord */}
          <a href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6A16 16 0 0 0 6 6"/><path d="M12 19l-2-2m4 0l-2 2"/></svg>
          </a>
        </div>

        <p className="text-white/30 text-sm font-medium">© @peddisetti surya</p>
      </div>

    </section>
  );
}


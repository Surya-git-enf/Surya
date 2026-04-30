"use client";

export default function Footer() {
  const items = [
    { name: "Transformers", glow: "shadow-blue-500/30" },
    { name: "Spider-Man", glow: "shadow-red-500/30" },
    { name: "Ice Cream", glow: "shadow-pink-500/30" },
    { name: "Mouse", glow: "shadow-gray-400/30" },
  ];

  return (
    <footer className="relative w-full bg-black pt-32 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-zinc-950" />

      {/* Cards */}
      <div className="relative z-10 mx-auto max-w-6xl px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.name}
              className={`group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] ${item.glow}`}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition" />

              <div className="h-28 w-full rounded-2xl bg-white/10 mb-4 flex items-center justify-center">
                <span className="text-white/30 text-xl">Preview</span>
              </div>

              <p className="text-white/80 tracking-widest text-sm uppercase">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm tracking-[0.2em] uppercase">
            © @peddisetti surya
          </p>

          <div className="flex gap-6 text-white/50 text-sm">
            <span className="hover:text-white transition">WhatsApp</span>
            <span className="hover:text-white transition">Instagram</span>
            <span className="hover:text-white transition">Discord</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

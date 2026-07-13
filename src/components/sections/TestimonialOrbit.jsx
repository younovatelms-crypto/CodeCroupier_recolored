import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPause, FiPlay } from "react-icons/fi";
import testimonials from "../../data/testimonials.json";

// Fixed scatter positions echoing the reference's floating-circle layout.
const positions = [
  { top: "8%", left: "20%", size: 56 },
  { top: "4%", left: "78%", size: 48 },
  { top: "62%", left: "10%", size: 52 },
  { top: "68%", left: "84%", size: 60 },
];

export default function TestimonialOrbit() {
  const items = testimonials.items;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setActive((i) => (i + 1) % items.length), 4000);
    return () => clearInterval(id);
  }, [playing, items.length]);

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-brand-red/10 blur-[130px] rounded-full" />

      <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center mb-10">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-brand-pink mb-4">
          {testimonials.eyebrow}
        </p>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
          {testimonials.title}
        </h2>
      </div>

      <div className="relative max-w-3xl mx-auto h-[22rem] sm:h-[30rem]" style={{ perspective: "1000px" }}>
        {/* scattered background avatars — hidden on mobile to avoid crowding/clipping on narrow screens */}
        {items.map((t, i) => {
          if (i === active) return null;
          const pos = positions[i % positions.length];
          return (
            <motion.button
              key={t.name}
              onClick={() => setActive(i)}
              className="hidden sm:flex absolute rounded-full items-center justify-center font-display font-bold text-silver-light/70 bg-gradient-to-br from-graphite to-black border border-graphite hover:border-neon-cyan/50 transition-colors"
              style={{ top: pos.top, left: pos.left, width: pos.size, height: pos.size }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08 }}
              aria-label={`Show testimonial from ${t.name}`}
            >
              {t.initials}
            </motion.button>
          );
        })}

        {/* mobile-only dot selector, since scattered avatars are hidden below sm */}
        <div className="flex sm:hidden justify-center gap-2 absolute top-0 inset-x-0">
          {items.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              aria-label={`Show testimonial from ${t.name}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-brand-red" : "w-1.5 bg-graphite"
              }`}
            />
          ))}
        </div>

        {/* active center avatar + quote */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg"
            >
              <p className="italic text-lg sm:text-xl text-silver-light leading-relaxed mb-6">
                "{items[active].quote}"
              </p>
              <p className="font-display font-bold text-white tracking-wide">
                {items[active].name}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            animate={{ boxShadow: [
              "0 0 20px 4px rgba(47,212,196,0.25)",
              "0 0 36px 8px rgba(47,212,196,0.4)",
              "0 0 20px 4px rgba(47,212,196,0.25)",
            ] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="mt-8 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-brand-red flex items-center justify-center font-display font-black text-2xl text-white bg-gradient-to-br from-brand-crimson to-black"
          >
            {items[active].initials}
          </motion.div>

          <button
            onClick={() => setPlaying((p) => !p)}
            className="mt-6 w-10 h-10 rounded-full border border-silver-border/60 flex items-center justify-center text-silver hover:text-brand-red hover:border-brand-red/60 transition-colors"
            aria-label={playing ? "Pause testimonial rotation" : "Play testimonial rotation"}
          >
            {playing ? <FiPause className="w-4 h-4" /> : <FiPlay className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}

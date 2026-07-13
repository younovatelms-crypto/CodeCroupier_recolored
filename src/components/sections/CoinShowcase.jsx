import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "../ui/Reveal";
import data from "../../data/coinGallery.json";

const images = import.meta.glob("../../assets/coins/*.jpg", { eager: true, import: "default" });
const videos = import.meta.glob("../../assets/videos/*.mp4", { eager: true, import: "default" });

function resolveSrc(file) {
  const match = Object.keys(images).find((k) => k.endsWith(file));
  return match ? images[match] : "";
}

function resolveVideoSrc(file) {
  const match = Object.keys(videos).find((k) => k.endsWith(file));
  return match ? videos[match] : "";
}

/**
 * Single 3D tilt coin card. Tracks pointer position and rotates the card
 * on X/Y axes with a spring for a tactile, physical "chip" feel.
 */
function TiltCard({ item, active, onClick }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 18 });
  const glowX = useTransform(mx, [-0.5, 0.5], ["10%", "90%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["10%", "90%"]);

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px);
    my.set(py);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 1000 }}
      className="relative shrink-0 w-[72vw] xs:w-64 sm:w-72 md:w-80 aspect-[3/4] rounded-3xl focus:outline-none"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative w-full h-full rounded-3xl overflow-hidden border-2 transition-colors duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.55)] ${
          active ? "border-brand-red" : "border-silver-border/40"
        }`}
      >
        {item.type === "video" ? (
          <video
            src={resolveVideoSrc(item.file)}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={resolveSrc(item.file)}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}
        {/* gradient wash for legible text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* dynamic glare that follows the pointer */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 md:opacity-100"
          style={{
            background: `radial-gradient(220px circle at ${glowX} ${glowY}, rgba(255,255,255,0.25), transparent 60%)`,
          }}
        />

        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur border border-brand-red/50 text-[10px] font-mono tracking-[0.2em] uppercase text-brand-pink">
          {item.tag}
        </div>

        <div className="absolute bottom-5 left-5 right-5" style={{ transform: "translateZ(40px)" }}>
          <p className="font-display font-extrabold text-xl sm:text-2xl bg-gradient-to-r from-white via-silver-light to-brand-pink bg-clip-text text-transparent text-glow">
            {item.title}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function CoinShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);
  const items = data.items;

  const goTo = useCallback(
    (i) => setIndex(((i % items.length) + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => goTo(index + 1), 3200);
    return () => clearInterval(t);
  }, [index, paused, goTo]);

  useEffect(() => {
    const el = trackRef.current?.children[index];
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  return (
    <section className="relative py-24 bg-bg-coal overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 bg-brand-red/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 blur-[130px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-brand-pink mb-4">
            {data.eyebrow}
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-3">
            {data.title}
          </h2>
          <p className="text-silver text-sm sm:text-base">{data.subtitle}</p>
        </Reveal>
      </div>

      {/* carousel track */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
      >
        <div
          ref={trackRef}
          className="flex gap-5 sm:gap-7 overflow-x-auto no-scrollbar px-[14vw] xs:px-8 md:px-[max(2rem,calc((100vw-80rem)/2+2rem))] py-4 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((item, i) => (
            <div key={item.id} className="snap-center">
              <TiltCard item={item} active={i === index} onClick={() => goTo(i)} />
            </div>
          ))}
        </div>

        {/* prev / next controls (desktop) */}
        <button
          aria-label="Previous"
          onClick={() => goTo(index - 1)}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 border border-silver-border/50 items-center justify-center text-silver-light hover:border-brand-red hover:text-brand-red transition-colors"
        >
          ‹
        </button>
        <button
          aria-label="Next"
          onClick={() => goTo(index + 1)}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 border border-silver-border/50 items-center justify-center text-silver-light hover:border-brand-red hover:text-brand-red transition-colors"
        >
          ›
        </button>
      </div>

      {/* dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {items.map((item, i) => (
          <button
            key={item.id}
            aria-label={`Go to ${item.title}`}
            onClick={() => goTo(i)}
            className="p-1.5"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === index ? "w-6 h-1.5 bg-brand-red" : "w-1.5 h-1.5 bg-silver-border/60"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

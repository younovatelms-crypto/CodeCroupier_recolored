import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * ============================================================================
 * MASCOT CAROUSEL — the 3 attached mascot artworks, auto-advancing.
 * Swap these paths for your own files in /public/assets/mascot-carousel/
 * if you want to change the artwork later.
 * ============================================================================
 */
const CAROUSEL_IMAGES = [
  "/assets/mascot-carousel/mascot-01.jpg",
  "/assets/mascot-carousel/mascot-02.jpg",
  "/assets/mascot-carousel/mascot-03.jpg",
];
const CAROUSEL_INTERVAL = 3200; // ms between auto-advances

/**
 * ============================================================================
 * ASSET PATHS — update these to match your real files in /assets/coin
 * ============================================================================
 * COIN_SRC    → the small coin image used for every orbiting coin
 * GROUND_SRC  → optional soft elliptical shadow under the mascot (screenshot
 *               style). Leave null to fall back to a CSS-drawn shadow.
 */
const COIN_SRC = "/assets/coin/coin.png";
const GROUND_SRC = null; // e.g. "/assets/coin/ground-shadow.png"

/**
 * A single small coin image that orbits around the mascot.
 * It's rendered inside a rotating parent (the orbit) and counter-rotates
 * itself so the coin face stays upright while it travels, plus a gentle
 * vertical bob so the motion doesn't feel mechanically flat.
 *
 * radius is expressed as a percentage of the container's half-width
 * (0–50), so the orbit scales with the container at every breakpoint
 * instead of being pinned to a fixed pixel value.
 */
function OrbitCoin({ radiusPct, size, duration, delay = 0, reverse = false, src, glowRgb }) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      className="absolute inset-0 flex items-start justify-center"
      style={{ transformOrigin: "50% 50%" }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    >
      <motion.div
        style={{ marginTop: `calc(50% - ${radiusPct}%)` }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <motion.div
          animate={{ rotate: reverse ? 360 : -360 }}
          transition={{ duration, repeat: Infinity, ease: "linear", delay }}
          className="rounded-full flex items-center justify-center"
          style={{
            width: size,
            height: size,
            filter: `drop-shadow(0 0 8px rgba(${glowRgb},0.55))`,
          }}
        >
          {!failed && src ? (
            <img
              src={src}
              alt=""
              className="w-full h-full object-contain select-none pointer-events-none"
              draggable={false}
              onError={() => setFailed(true)}
            />
          ) : (
            // Fallback so the layout never breaks if the asset path is wrong
            <div
              className="w-full h-full rounded-full flex items-center justify-center font-display font-black text-black text-xs"
              style={{ background: "linear-gradient(135deg, #DFC48A, #C5A162 55%, #F0E4C8)" }}
            >
              $
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Auto-advancing image carousel for the 3 mascot artworks. Each slide slides
 * in from the right and exits to the left, so the sequence reads left-to-
 * right over time — this replaces the old single static/rotating mascot
 * image, while everything else (orbit rings, orbiting coins, glow pulse)
 * keeps working exactly as before.
 */
function MascotCarousel() {
  const [index, setIndex] = useState(0);
  const [failedSrcs, setFailedSrcs] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % CAROUSEL_IMAGES.length);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const src = CAROUSEL_IMAGES[index];
  const failed = failedSrcs[src];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-full">
      <AnimatePresence initial={false} mode="popLayout">
        {!failed ? (
          <motion.img
            key={src}
            src={src}
            alt="CodeCroupier mascot"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
            draggable={false}
            onError={() =>
              setFailedSrcs((prev) => ({ ...prev, [src]: true }))
            }
          />
        ) : (
          // Fallback to the original CSS chip if this slide's asset is missing
          <motion.div
            key={`${src}-fallback`}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1E2430] via-black to-[#0A0D13] border-4 border-silver-border/70 flex items-center justify-center"
          >
            <div className="absolute inset-3 rounded-full border-2 border-dashed border-brand-red/40" />
            <div className="text-center">
              <div className="font-display font-black text-4xl sm:text-5xl text-white text-glow">CodeCroupier</div>
              <div className="font-mono text-xs tracking-[0.3em] text-brand-pink mt-1">$CCHIP</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* slide indicator dots, same visual language as the Hero carousel */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {CAROUSEL_IMAGES.map((s, i) => (
          <span
            key={s}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-5 bg-white/90" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


/**
 * glowRgb lets a parent (e.g. the Hero carousel) sync the mascot's pulse
 * color to whatever accent is currently active, so the whole hero feels
 * like one coordinated moment rather than a static visual next to
 * changing text. Defaults to Signal Cyan, the primary brand accent.
 */
export default function ChipVisual({ glowRgb = "47,212,196" }) {
  return (
    <div className="relative w-[min(80vw,22rem)] h-[min(80vw,22rem)] sm:w-[26rem] sm:h-[26rem] mx-auto">
      {/* outer rotating ring */}
      <motion.svg
        viewBox="0 0 300 300"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="150" cy="150" r="140" fill="none" stroke="#7A7A7A" strokeWidth="2" strokeDasharray="4 10" opacity="0.6" />
        <circle cx="150" cy="150" r="120" fill="none" stroke="#6B5CE0" strokeWidth="1.5" opacity="0.35" />
      </motion.svg>

      {/* counter-rotating ring */}
      <motion.svg
        viewBox="0 0 300 300"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="150" cy="150" r="100" fill="none" stroke="#2FD4C4" strokeWidth="1" strokeDasharray="2 8" opacity="0.4" />
      </motion.svg>

      {/* orbiting coin images — radius is a % of the container so it scales responsively */}
      <OrbitCoin radiusPct={47} size={34} duration={14} src={COIN_SRC} glowRgb={glowRgb} />
      <OrbitCoin radiusPct={47} size={26} duration={20} delay={2} reverse src={COIN_SRC} glowRgb={glowRgb} />
      <OrbitCoin radiusPct={40} size={20} duration={26} delay={5} src={COIN_SRC} glowRgb={glowRgb} />
      <OrbitCoin radiusPct={40} size={28} duration={17} delay={1} reverse src={COIN_SRC} glowRgb={glowRgb} />

      {/* mascot — floats gently, glow pulses with the active brand color */}
      <motion.div
        className="absolute inset-10 flex items-center justify-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          animate={{
            filter: [
              `drop-shadow(0 0 25px rgba(${glowRgb},0.35))`,
              `drop-shadow(0 0 45px rgba(${glowRgb},0.55))`,
              `drop-shadow(0 0 25px rgba(${glowRgb},0.35))`,
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* the 3 attached mascot artworks cycle here automatically */}
          <div className="relative w-[80%] h-[80%]">
            <MascotCarousel />
          </div>
        </motion.div>

        {/* ground shadow beneath the mascot, screenshot-style */}
        {GROUND_SRC ? (
          <img
            src={GROUND_SRC}
            alt=""
            className="absolute bottom-[6%] w-[55%] opacity-70 select-none pointer-events-none"
            draggable={false}
          />
        ) : (
          <motion.div
            className="absolute bottom-[8%] w-[50%] h-6 rounded-full blur-md"
            animate={{ backgroundColor: `rgba(${glowRgb},0.35)`, opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>

      {/* ambient pulse glow behind everything */}
      <motion.div
        className="absolute inset-10 rounded-full pointer-events-none -z-10"
        animate={{
          boxShadow: [
            `0 0 20px 0 rgba(${glowRgb},0.25)`,
            `0 0 45px 8px rgba(${glowRgb},0.4)`,
            `0 0 20px 0 rgba(${glowRgb},0.25)`,
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
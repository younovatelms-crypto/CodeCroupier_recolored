import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrimaryButton, SecondaryButton } from "../ui/Button";
import ChipVisual from "../ui/ChipVisual";

/**
 * Carousel content — each slide swaps the headline's second line, the
 * supporting copy, and the bullet list. The accent color rotates through
 * the brand's neon palette so each slide reads as a distinct "mood"
 * while staying inside the same visual system.
 */
const SLIDES = [
  {
    line2: "Is Code.",
    accent: "text-brand-red",
    glowRgb: "47,212,196", // brand-red
    badge: "Fully on-chain roulette",
    desc: "CodeCroupier is a fully on-chain casino powered by verifiable smart-contract logic and C-Chip ($CCHIP). No hidden backend. No black box.",
    bullets: ["Provably fair, every spin", "Instant on-chain settlement", "Zero house backend"],
  },
  {
    line2: "Is Fair.",
    accent: "text-neon-purple",
    glowRgb: "107,92,224", // neon-purple
    badge: "Verifiable RNG on-chain",
    desc: "Every outcome is generated and verified by the contract itself — auditable in real time, with no operator able to touch the result.",
    bullets: ["Open-source contract", "Auditable RNG seed", "Community-verified logic"],
  },
  {
    line2: "Is Yours.",
    accent: "text-neon-cyan",
    glowRgb: "47,212,196", // neon-cyan
    badge: "$CCHIP powered",
    desc: "Hold, stake, or wager $CCHIP directly at the table. Your wallet is the cashier — no deposits, no withdrawals, no waiting.",
    bullets: ["Wallet-native wagering", "Stake $CCHIP for yield", "Withdraw anytime, on-chain"],
  },
];

const SLIDE_DURATION = 1800; // ms between auto-advances

const textVariants = {
  enter: { opacity: 0, x: 60 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [advance]);

  const slide = SLIDES[index];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-black bg-grid"
    >
      {/* fog / glow blobs — color follows the active slide's accent */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-neon-purple/20 blur-[120px]" />
      <motion.div
        className="pointer-events-none absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full blur-[120px]"
        animate={{ backgroundColor: `rgba(${slide.glowRgb},0.25)` }}
        transition={{ duration: 0.8 }}
      />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-[24rem] h-[24rem] rounded-full bg-neon-cyan/10 blur-[110px]" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-16 items-center w-full">
        <div className="text-center lg:text-left">
          {/* eyebrow badge — crossfades with the slide */}
          <div className="min-h-[2.25rem] flex justify-center lg:justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${index}`}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-red/60 text-brand-pink text-xs font-mono tracking-widest uppercase mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                {slide.badge}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* headline — first line static, second line rotates through the carousel */}
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-white text-glow">
            The Dealer
            <br />
            <span className="relative inline-block overflow-hidden align-top min-h-[1.1em] min-w-[6ch]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`line2-${index}`}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={`block ${slide.accent}`}
                >
                  {slide.line2}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* description */}
          <div className="mt-6 min-h-[4.5rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${index}`}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="text-silver text-lg max-w-lg mx-auto lg:mx-0"
              >
                {slide.desc}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* bullets */}
          <div className="mt-5 min-h-[5.5rem] sm:min-h-[2rem]">
            <AnimatePresence mode="wait">
              <motion.ul
                key={`bullets-${index}`}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-silver/90 font-mono"
              >
                {slide.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 justify-center lg:justify-start">
                    <span className={`${slide.accent}`}>✓</span>
                    {b}
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          {/* static CTAs — unaffected by the carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <PrimaryButton>Launch Roulette</PrimaryButton>
            <SecondaryButton>View Contract</SecondaryButton>
          </motion.div>

          {/* carousel indicator dots */}
          <div className="mt-8 flex gap-2 justify-center lg:justify-start">
            {SLIDES.map((s, i) => (
              <button
                key={s.line2}
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1}`}
                className="relative h-1.5 rounded-full bg-white/15 overflow-hidden transition-all duration-300"
                style={{ width: i === index ? 28 : 8 }}
              >
                {i === index && (
                  <motion.span
                    key={`dot-fill-${index}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                    className={`absolute inset-0 origin-left ${slide.accent} bg-current`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60, rotate: -6 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <ChipVisual glowRgb={slide.glowRgb} />
        </motion.div>
      </div>
    </section>
  );
}
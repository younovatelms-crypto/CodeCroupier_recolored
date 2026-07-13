import { motion } from "framer-motion";
import data from "../../data/odds.json";
import Reveal from "../ui/Reveal";

/**
 * Three concentric rings, each stroked with its own linear gradient so the
 * color visibly sweeps/"transverses" around the circle rather than reading
 * as one flat hue. Each ring also gets a soft drop-shadow glow and a small
 * directional marker (arrow/tick) that travels with it, echoing the
 * reference screenshot's rotating dial.
 */
function OddsRings() {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
      {/* shared gradient + glow filter defs, reused by all three rings */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="ringGradOuter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7A7A7A" stopOpacity="0.15" />
            <stop offset="45%" stopColor="#2FD4C4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6FE0D2" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="ringGradMid" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2FD4C4" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#2FD4C4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6B5CE0" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="ringGradInner" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B5CE0" stopOpacity="0.2" />
            <stop offset="55%" stopColor="#2FD4C4" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#6FE0D2" stopOpacity="0.3" />
          </linearGradient>
          <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* outer ring — slow, brand-red gradient sweep */}
      <motion.svg
        viewBox="0 0 300 300"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="none"
          stroke="url(#ringGradOuter)"
          strokeWidth="2.5"
          strokeDasharray="60 30"
          strokeLinecap="round"
          filter="url(#ringGlow)"
        />
        {/* directional marker riding the outer ring */}
        <path d="M 150 8 L 161 22 L 139 22 Z" fill="#6FE0D2" opacity="0.9" filter="url(#ringGlow)" />
      </motion.svg>

      {/* mid ring — counter-rotating, cyan/purple gradient sweep */}
      <motion.svg
        viewBox="0 0 300 300"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="150"
          cy="150"
          r="112"
          fill="none"
          stroke="url(#ringGradMid)"
          strokeWidth="1.75"
          strokeDasharray="40 20"
          strokeLinecap="round"
          filter="url(#ringGlow)"
        />
        <path d="M 150 38 L 160 50 L 140 50 Z" fill="#2FD4C4" opacity="0.85" filter="url(#ringGlow)" />
      </motion.svg>

      {/* inner ring — fast, red/purple gradient sweep */}
      <motion.svg
        viewBox="0 0 300 300"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="150"
          cy="150"
          r="86"
          fill="none"
          stroke="url(#ringGradInner)"
          strokeWidth="1.75"
          strokeDasharray="3 9"
          opacity="0.9"
          filter="url(#ringGlow)"
        />
      </motion.svg>

      {/* ambient breathing glow behind the center disc */}
      <motion.div
        className="absolute inset-[24%] rounded-full pointer-events-none -z-10"
        animate={{
          boxShadow: [
            "0 0 30px 4px rgba(47,212,196,0.25)",
            "0 0 55px 10px rgba(47,212,196,0.25)",
            "0 0 30px 4px rgba(47,212,196,0.25)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* center disc — gradient ring "border" via padding trick, bold glowing label */}
      <div
        className="absolute inset-[26%] rounded-full p-[2px]"
        style={{
          background:
            "conic-gradient(from 0deg, #2FD4C4, #6B5CE0, #2FD4C4, #2FD4C4)",
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1E2430] via-black to-[#0A0D13] flex flex-col items-center justify-center text-center px-4">
          <motion.span
            className="font-display font-black text-lg sm:text-xl text-white leading-tight"
            animate={{
              textShadow: [
                "0 0 8px rgba(47,212,196,0.6), 0 0 18px rgba(47,212,196,0.35)",
                "0 0 10px rgba(47,212,196,0.65), 0 0 22px rgba(107,92,224,0.4)",
                "0 0 8px rgba(47,212,196,0.6), 0 0 18px rgba(47,212,196,0.35)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {data.wheelLabel}
          </motion.span>
          <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-brand-pink mt-1">
            {data.wheelSub}
          </span>
        </div>
      </div>
    </div>
  );
}

function StatBlock({ label, value }) {
  return (
    <div>
      <p className="text-xs font-mono uppercase tracking-widest text-silver-border mb-1">{label}</p>
      <p className="font-display font-black text-4xl sm:text-5xl text-white">{value}</p>
    </div>
  );
}

export default function OddsSplit() {
  return (
    <section className="relative py-24 bg-bg-coal overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-0 w-72 h-72 -translate-y-1/2 bg-neon-purple/10 blur-[110px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal direction="left">
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-red/50 text-brand-pink text-xs font-mono uppercase tracking-widest mb-6">
            {data.eyebrow}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white mb-5">
            {data.titleLine1}
            <br />
            <motion.span
              className="bg-gradient-to-r from-brand-red via-brand-pink to-brand-red bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              {data.titleLine2}
            </motion.span>
          </h2>

          <div className="flex divide-x divide-graphite rounded-[14px] border border-graphite bg-white/[0.03] px-6 py-5 w-fit mb-6">
            <div className="pr-8">
              <StatBlock label={data.stats[0].label} value={data.stats[0].value} />
            </div>
            <div className="pl-8">
              <StatBlock label={data.stats[1].label} value={data.stats[1].value} />
            </div>
          </div>

          <p className="text-silver max-w-md">{data.description}</p>
        </Reveal>

        <Reveal direction="right">
          <OddsRings />
        </Reveal>
      </div>
    </section>
  );
}
import { useState } from "react";
import Reveal from "../ui/Reveal";

/**
 * Feature set — themed to CodeCroupier's on-chain casino positioning.
 * Each card gets an accent pulled from the brand palette so the row reads
 * as one coordinated system rather than repeating a single color 6 times.
 */
const FEATURES = [
  {
    title: "Instant Wallet Connect",
    desc: "Sit at the table in one click — no sign-up, no KYC, just your wallet.",
    text: "text-brand-pink",
    border: "border-brand-red/50",
    icon: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Verifiable RNG",
    desc: "Every spin's seed is generated and checkable on-chain, in real time.",
    text: "text-neon-purple",
    border: "border-neon-purple/50",
    icon: <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.95 6.95-2.12-2.12M8.17 8.17 6.05 6.05m11.9 0-2.12 2.12M8.17 15.83l-2.12 2.12" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  {
    title: "Transparent Payouts",
    desc: "Contract-enforced odds — see exactly what you keep on every win.",
    text: "text-neon-cyan",
    border: "border-neon-cyan/50",
    icon: <path d="M3 3v18h18M7 15l4-4 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  {
    title: "Live Table Feed",
    desc: "Watch bets, spins, and settlements stream straight from the chain.",
    text: "text-brand-pink",
    border: "border-brand-red/50",
    icon: <path d="M4 19V9m6 10V5m6 14v-7m6 7v-4" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  {
    title: "Multi-Chain Ready",
    desc: "Bring $CCHIP wherever your wallet lives — no bridging headaches.",
    text: "text-neon-purple",
    border: "border-neon-purple/50",
    icon: <circle cx="12" cy="12" r="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Community Governed",
    desc: "House edge, table limits, and new games are voted on by holders.",
    text: "text-neon-cyan",
    border: "border-neon-cyan/50",
    icon: (
      <path
        d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M11 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm8 18v-2a4 4 0 0 0-3-3.87M14.5 3.13A4 4 0 0 1 17 7a4 4 0 0 1-2.5 3.87"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
];

function FeatureCard({ item }) {
  return (
    <div
      className={`shrink-0 w-[78vw] xs:w-72 sm:w-80 rounded-2xl border ${item.border} bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm px-6 py-7`}
    >
      <div className={`w-11 h-11 rounded-full border ${item.border} flex items-center justify-center mb-5`}>
        <svg viewBox="0 0 24 24" className={`w-5 h-5 ${item.text}`} stroke="currentColor" strokeWidth="2" fill="none">
          {item.icon}
        </svg>
      </div>
      <h3 className={`font-display font-bold text-lg mb-2 ${item.text}`}>{item.title}</h3>
      <p className="text-silver text-sm leading-relaxed">{item.desc}</p>
    </div>
  );
}

export default function FeaturesMarquee() {
  // Duplicate the list so the track can loop seamlessly: the CSS animation
  // slides exactly -50% (the width of one full set), then snaps back to 0%,
  // which is invisible because the second half is an identical copy.
  const track = [...FEATURES, ...FEATURES];

  return (
    <section className="relative py-24 bg-bg-coal overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 bg-brand-red/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 blur-[130px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-brand-pink mb-4">
            Advanced Features
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl bg-gradient-to-r from-white via-brand-pink to-brand-red bg-clip-text text-transparent text-glow">
            The Power Behind Your Table
          </h2>
        </Reveal>
      </div>

      {/* fade edges so cards appear to slide in/out of view rather than clip abruptly */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-bg-coal to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-bg-coal to-transparent z-10" />

        <div className="marquee-viewport overflow-hidden">
          <div className="marquee-track flex gap-5 sm:gap-7 w-max">
            {track.map((item, i) => (
              <FeatureCard key={`${item.title}-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Plain CSS keyframe loop — pausable via animation-play-state, which
          JS-driven (framer-motion) animations can't do reliably. Runs at a
          constant, jump-free speed regardless of viewport width. */}
      <style>{`
        @keyframes cc-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: cc-marquee 32s linear infinite;
        }
        .marquee-viewport:hover .marquee-track,
        .marquee-viewport:focus-within .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
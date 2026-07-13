import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";
import data from "../../data/pricing.json";
import Reveal from "../ui/Reveal";
import { PrimaryButton } from "../ui/Button";

export default function PricingCard() {
  return (
    <section className="relative py-24 bg-black bg-grid overflow-hidden">
      {/* drifting spark lines, echoes the reference layout without the ROI framing */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-px w-16 bg-gradient-to-r from-transparent via-brand-red/70 to-transparent"
            style={{ top: `${12 + i * 14}%`, left: `${(i * 37) % 90}%` }}
            animate={{ opacity: [0.15, 0.6, 0.15], x: [0, 12, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <Reveal direction="left">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-neon-purple mb-4">
            {data.eyebrow}
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white">
            {data.title}
            <br />
            <span className="text-brand-red">{data.titleAccent}</span>
          </h2>
          <p className="mt-5 text-silver max-w-md">{data.description}</p>
        </Reveal>

        <Reveal direction="right">
          <div className="relative rounded-2xl border border-graphite bg-bg-panel/70 backdrop-blur p-8 sm:p-10 overflow-hidden">
            <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 bg-brand-red/20 blur-[90px] rounded-full" />

            <p className="font-mono text-xs uppercase tracking-widest text-silver-border mb-2">
              {data.planLabel}
            </p>
            <div className="flex items-end gap-1 mb-8">
              <span className="font-display font-black text-5xl sm:text-6xl text-white">
                ${data.price}
              </span>
              <span className="text-silver mb-1.5">{data.period}</span>
            </div>

            <ul className="space-y-4 mb-9">
              {data.perks.map((perk, i) => (
                <li key={perk} className="flex items-start gap-3">
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
                    className="w-5 h-5 shrink-0 rounded-full bg-brand-red/15 border border-brand-red/50 flex items-center justify-center text-brand-red mt-0.5"
                  >
                    <FiZap className="w-2.5 h-2.5" />
                  </motion.span>
                  <span className="text-sm text-silver-light">{perk}</span>
                </li>
              ))}
            </ul>

            <PrimaryButton className="w-full">{data.cta}</PrimaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

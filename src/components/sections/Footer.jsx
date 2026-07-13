import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTwitter, FiMessageCircle, FiSend, FiArrowUpRight } from "react-icons/fi";
import nav from "../../data/nav.json";

const resources = [
  { label: "View Contract", to: "/how-it-works" },
  { label: "Risk Disclosure", to: "/faq" },
  { label: "Terms & Conditions", to: "/faq" },
];

const socials = [
  { Icon: FiSend, label: "Telegram", href: "#" },
  { Icon: FiTwitter, label: "X / Twitter", href: "#" },
  { Icon: FiMessageCircle, label: "Discord", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-bg-coal border-t border-graphite overflow-hidden">
      {/* subtle top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-red/60 to-transparent" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 w-80 h-80 bg-neon-purple/10 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 w-80 h-80 bg-brand-red/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] mb-14">
          {/* Brand column */}
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <span className="w-10 h-10 rounded-full border-2 border-brand-red flex items-center justify-center font-display font-black text-brand-red glow-red group-hover:bg-brand-red/10 transition-colors">
                C
              </span>
              <span className="font-display font-extrabold text-lg text-white tracking-wide">
                {nav.brand.name}
              </span>
            </Link>
            <p className="text-sm text-silver leading-relaxed mb-5">
              {nav.brand.tagline} — a fully on-chain casino where every
              outcome is backed by verifiable smart-contract logic.
            </p>
            <p className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neon-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
              Contract Live
            </p>
          </div>

          {/* Navigate column */}
          <div>
            <p className="font-display font-semibold text-white mb-5 text-sm tracking-wide uppercase">
              Navigate
            </p>
            <ul className="space-y-3">
              {nav.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-silver hover:text-brand-red transition-colors inline-flex items-center gap-1.5 group"
                  >
                    {l.label}
                    <FiArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <p className="font-display font-semibold text-white mb-5 text-sm tracking-wide uppercase">
              Resources
            </p>
            <ul className="space-y-3">
              {resources.map((r) => (
                <li key={r.label}>
                  <Link
                    to={r.to}
                    className="text-sm text-silver hover:text-neon-cyan transition-colors inline-flex items-center gap-1.5 group"
                  >
                    {r.label}
                    <FiArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community column */}
          <div>
            <p className="font-display font-semibold text-white mb-5 text-sm tracking-wide uppercase">
              Community
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full border border-silver-border/70 flex items-center justify-center text-silver hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_16px_rgba(47,212,196,0.35)] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            <p className="text-xs text-silver-border mt-5 font-mono">hello@codecroupier.io</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-graphite pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs text-silver-border text-center sm:text-left">
          <p>© 2026 CodeCroupier. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            Game of chance. Please bet responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}

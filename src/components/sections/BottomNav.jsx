import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiCpu, FiUsers, FiHelpCircle, FiMail } from "react-icons/fi";
import nav from "../../data/nav.json";

const ICONS = {
  "/": FiHome,
  "/how-it-works": FiCpu,
  "/about": FiUsers,
  "/faq": FiHelpCircle,
  "/contact": FiMail,
};

/**
 * Fixed bottom tab bar for phones/small tablets.
 * Purely additive: the existing top Navbar (with its own mobile
 * hamburger drawer) is untouched, this just gives touch users a
 * thumb-reachable app-style nav as well.
 */
export default function BottomNav() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bottom-nav-safe"
      aria-label="Primary mobile navigation"
    >
      <div className="mx-3 mb-3 rounded-2xl bg-black/85 backdrop-blur-xl border border-graphite shadow-[0_-8px_40px_rgba(0,0,0,0.55)]">
        <ul className="flex items-stretch justify-between px-1">
          {nav.links.map((l) => {
            const Icon = ICONS[l.to] || FiHome;
            const isActive = l.to === "/" ? location.pathname === "/" : location.pathname.startsWith(l.to);
            return (
              <li key={l.to} className="flex-1">
                <NavLink
                  to={l.to}
                  className="relative flex flex-col items-center justify-center gap-1 py-2.5 select-none"
                >
                  {isActive && (
                    <motion.span
                      layoutId="bottomnav-active"
                      className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-brand-red glow-red"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <motion.span
                    animate={isActive ? { y: -2, scale: 1.08 } : { y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${
                      isActive
                        ? "text-brand-red bg-brand-red/10 shadow-[0_0_16px_rgba(47,212,196,0.45)]"
                        : "text-silver-border"
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </motion.span>
                  <span
                    className={`text-[10px] font-display font-semibold tracking-wide transition-colors duration-200 ${
                      isActive ? "text-brand-red" : "text-silver-border"
                    }`}
                  >
                    {l.label === "How It Works" ? "Guide" : l.label === "Contact Us" ? "Contact" : l.label === "About Us" ? "About" : l.label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import nav from "../../data/nav.json";
import { PrimaryButton, SecondaryButton } from "../ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-graphite" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <span className="relative w-10 h-10 rounded-full border-2 border-brand-red flex items-center justify-center font-display font-black text-brand-red glow-red">
            C
          </span>
          <span className="font-display font-extrabold tracking-wide text-lg text-silver-light">
            {nav.brand.name}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-brand-red" : "text-silver hover:text-brand-red"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <SecondaryButton className="px-5 py-2 text-sm">Login</SecondaryButton>
          </Link>
          <Link to="/register">
            <PrimaryButton className="px-5 py-2 text-sm">Register</PrimaryButton>
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-silver-light w-9 h-9 flex flex-col justify-center items-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="lg:hidden bg-black/95 border-t border-graphite px-5 pb-6 pt-2 flex flex-col gap-4"
        >
          {nav.links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-1 transition-colors ${isActive ? "text-brand-red" : "text-silver hover:text-brand-red"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="flex gap-3 pt-2">
            <Link to="/login" className="flex-1" onClick={() => setOpen(false)}>
              <SecondaryButton className="w-full py-2 text-sm">Login</SecondaryButton>
            </Link>
            <Link to="/register" className="flex-1" onClick={() => setOpen(false)}>
              <PrimaryButton className="w-full py-2 text-sm">Register</PrimaryButton>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

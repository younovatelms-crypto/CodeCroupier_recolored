import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiHome } from "react-icons/fi";
import auth from "../data/auth.json";
import { PrimaryButton } from "../components/ui/Button";
import ChipVisual from "../components/ui/ChipVisual";

const countries = [
  "United States", "United Kingdom", "India", "Canada", "Australia",
  "Germany", "France", "Japan", "Brazil", "Other",
];

function Carousel({ slides }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="relative h-full min-h-[420px] flex flex-col justify-between p-8 sm:p-10 overflow-hidden">
      <div className="pointer-events-none absolute -top-16 -left-16 w-72 h-72 bg-brand-red/20 blur-[100px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-64 h-64 bg-neon-purple/20 blur-[100px] rounded-full" />

      <div className="relative">
        <p className="font-display font-extrabold text-2xl text-white">
          Code<span className="text-brand-red">Croupier</span>
        </p>
      </div>

      <div className="relative flex justify-center py-6">
        <div className="scale-[0.55] sm:scale-75">
          <ChipVisual />
        </div>
      </div>

      <div className="relative min-h-[110px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan mb-2">
              {slides[index].eyebrow}
            </p>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              {slides[index].title}
            </h3>
            <p className="text-sm text-silver leading-relaxed max-w-sm">
              {slides[index].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 mt-5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-brand-red" : "w-1.5 bg-graphite"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  const t = auth.register;
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="relative min-h-screen bg-black flex">
      <div className="hidden lg:block lg:w-[42%] bg-gradient-to-br from-bg-panel via-black to-bg-coal border-r border-graphite">
        <Carousel slides={t.slides} />
      </div>

      <div className="relative flex-1 bg-black bg-grid px-5 sm:px-10 lg:px-16 py-12 overflow-y-auto">
        <Link
          to="/"
          className="absolute top-6 right-5 sm:right-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-graphite text-sm text-silver hover:text-white hover:border-silver-border transition-colors"
        >
          <FiHome /> Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto pt-14 lg:pt-4"
        >
          <div className="text-center mb-8">
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white text-glow mb-2">
              {t.heading}
            </h1>
            <p className="text-sm text-silver">Join the CodeCroupier table.</p>
          </div>

          <PrimaryButton className="w-full py-3.5 mb-6">{t.walletCta}</PrimaryButton>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-graphite" />
            <span className="text-xs font-mono text-silver-border uppercase">or fill in details</span>
            <div className="h-px flex-1 bg-graphite" />
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="block text-xs font-mono uppercase tracking-wider text-silver-border mb-2">
                  {t.fields.username}*
                </span>
                <input
                  type="text"
                  placeholder="Username"
                  required
                  className="w-full bg-white/[0.03] border border-graphite rounded-lg px-4 py-3 text-sm text-silver-light placeholder:text-silver-border focus:outline-none focus:border-brand-red transition-colors"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-mono uppercase tracking-wider text-silver-border mb-2">
                  {t.fields.email}*
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full bg-white/[0.03] border border-graphite rounded-lg px-4 py-3 text-sm text-silver-light placeholder:text-silver-border focus:outline-none focus:border-brand-red transition-colors"
                />
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="block text-xs font-mono uppercase tracking-wider text-silver-border mb-2">
                  {t.fields.country}*
                </span>
                <select
                  required
                  defaultValue=""
                  className="w-full bg-white/[0.03] border border-graphite rounded-lg px-4 py-3 text-sm text-silver-light focus:outline-none focus:border-brand-red transition-colors"
                >
                  <option value="" disabled>
                    Select Country
                  </option>
                  {countries.map((c) => (
                    <option key={c} value={c} className="bg-black">
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="block text-xs font-mono uppercase tracking-wider text-silver-border mb-2">
                  {t.fields.mobile}
                </span>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full bg-white/[0.03] border border-graphite rounded-lg px-4 py-3 text-sm text-silver-light placeholder:text-silver-border focus:outline-none focus:border-brand-red transition-colors"
                />
              </label>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-brand-red"
              />
              <span className="text-sm text-silver">
                {t.terms.replace("Terms and Conditions", "")}
                <Link to="/faq" className="text-brand-red hover:text-brand-pink transition-colors">
                  Terms and Conditions
                </Link>
              </span>
            </label>

            <PrimaryButton type="submit" disabled={!accepted} className="w-full py-3.5 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none">
              Create Account
            </PrimaryButton>

            <p className="text-sm text-silver text-center">
              {t.haveAccount}{" "}
              <Link to="/login" className="text-brand-red font-semibold hover:text-brand-pink transition-colors">
                {t.haveAccountCta}
              </Link>
            </p>

            <div className="rounded-lg border border-dashed border-graphite px-4 py-3 text-xs text-silver-border font-mono text-center">
              {t.metamaskNote}:{" "}
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noreferrer"
                className="text-neon-cyan hover:underline"
              >
                Click here
              </a>
            </div>

            <p className="text-xs text-silver-border text-center leading-relaxed pt-2 border-t border-graphite">
              {t.riskNote}
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

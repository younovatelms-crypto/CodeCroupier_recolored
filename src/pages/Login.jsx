import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import auth from "../data/auth.json";
import { PrimaryButton } from "../components/ui/Button";

export default function Login() {
  const t = auth.login;

  return (
    <div className="relative min-h-screen bg-black bg-grid flex items-center justify-center px-5 py-16 overflow-hidden">
      <div className="pointer-events-none absolute -top-20 left-1/4 w-96 h-96 bg-brand-red/15 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 bg-neon-purple/15 blur-[120px] rounded-full" />

      <Link
        to="/"
        className="absolute top-6 left-5 sm:left-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-graphite text-sm text-silver hover:text-white hover:border-silver-border transition-colors"
      >
        <FiArrowLeft /> Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md text-center"
      >
        <h1 className="font-display font-black text-4xl sm:text-5xl text-white text-glow mb-2">
          {t.title}
        </h1>
        <p className="text-brand-pink font-mono text-sm mb-10">{t.subtitle}</p>

        <div className="rounded-2xl border border-graphite bg-bg-panel/70 backdrop-blur p-8 space-y-5">
          <PrimaryButton className="w-full py-3.5">{t.walletCta}</PrimaryButton>

          <p className="text-sm text-silver">
            {t.noAccount}{" "}
            <Link to="/register" className="text-brand-red font-semibold hover:text-brand-pink transition-colors">
              {t.noAccountCta}
            </Link>
          </p>

          <div className="rounded-lg border border-dashed border-graphite px-4 py-3 text-xs text-silver-border font-mono">
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
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";

const metrics = [
  { label: "C-Chip Balance", value: "1,240.00", color: "text-silver-light" },
  { label: "Network", value: "Base Mainnet", color: "text-neon-purple" },
  { label: "Last Settlement", value: "Success", color: "text-profit-green" },
  { label: "Contract Status", value: "Live", color: "text-neon-cyan" },
];

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="relative py-28 bg-bg-coal overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 blur-[120px] rounded-full" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal direction="left">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-brand-pink mb-4">
            Token Dashboard
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-5">
            Every Balance, Every Event, In Full View
          </h2>
          <p className="text-silver max-w-md">
            Your C-Chip dashboard mirrors the chain in real time — balances,
            transaction history, and contract status, all readable at a glance
            and verifiable independently.
          </p>
        </Reveal>

        <Reveal direction="right">
          <div className="rounded-2xl border border-graphite bg-black/60 backdrop-blur p-6 sm:p-8 shadow-[0_0_50px_rgba(107,92,224,0.15)]">
            <div className="flex items-center justify-between mb-6">
              <span className="font-display font-bold text-white">Wallet Overview</span>
              <span className="flex items-center gap-2 text-xs font-mono text-profit-green">
                <span className="w-1.5 h-1.5 rounded-full bg-profit-green animate-pulse" />
                Connected
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-[14px] border border-[#262C3A] bg-white/[0.03] p-4 hover:border-brand-red/40 transition-colors"
                >
                  <p className="text-[11px] text-silver-border font-mono uppercase tracking-wider mb-1">
                    {m.label}
                  </p>
                  <p className={`font-mono font-semibold text-lg ${m.color}`}>{m.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

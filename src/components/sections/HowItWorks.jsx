import data from "../../data/steps.json";
import Reveal from "../ui/Reveal";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 bg-black bg-grid">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal direction="left" className="max-w-2xl mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-neon-cyan mb-4">
            {data.eyebrow}
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            {data.title}
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.items.map((step, i) => (
            <Reveal key={step.number} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
              <div className="relative h-full rounded-[14px] border border-graphite bg-bg-panel/60 p-6 overflow-hidden group hover:border-neon-purple/50 transition-colors duration-300">
                <span className="absolute -top-3 -right-1 font-display font-black text-6xl text-white/5 group-hover:text-neon-purple/10 transition-colors">
                  {step.number}
                </span>
                <p className="font-mono text-brand-red text-sm mb-3">{step.number}</p>
                <h3 className="font-display font-bold text-lg text-white mb-2">{step.title}</h3>
                <p className="text-sm text-silver leading-relaxed">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

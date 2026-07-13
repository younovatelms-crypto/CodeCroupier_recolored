import about from "../../data/about.json";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";
import TestimonialOrbit from "./TestimonialOrbit";

export default function About() {
  return (
    <>
      <section className="relative py-24 bg-black bg-grid overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal direction="left">
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-brand-crimson/20 via-black to-neon-purple/10 border border-graphite flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-40" />
              <div className="relative w-40 h-40 rounded-3xl rotate-12 border-2 border-brand-red/60 glow-red flex items-center justify-center">
                <span className="font-display font-black text-5xl text-white">CC</span>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-neon-purple mb-4">
              {about.eyebrow}
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-6">
              {about.title}
            </h2>
            {about.intro.map((p, i) => (
              <p key={i} className="text-silver mb-4 leading-relaxed">
                {p}
              </p>
            ))}
            <blockquote className="mt-6 border-l-2 border-brand-red pl-5 italic text-silver-light">
              "{about.quote}"
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 bg-bg-coal">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal direction="left">
            <span className="inline-block px-4 py-1.5 rounded-full border border-brand-red/50 text-brand-pink text-xs font-mono uppercase tracking-widest mb-5">
              {about.visionTag}
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-5">
              {about.visionTitle}
            </h2>
            {about.visionParagraphs.map((p, i) => (
              <p key={i} className="text-silver mb-4 leading-relaxed">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal direction="right">
            <div className="grid grid-cols-2 gap-4">
              {about.pillars.map((p) => (
                <div
                  key={p.label}
                  className="rounded-[14px] border border-graphite bg-black/50 aspect-square flex flex-col items-center justify-center gap-3 hover:border-neon-purple/50 transition-colors"
                >
                  <Icon name={p.icon} className="w-7 h-7 text-neon-purple" />
                  <span className="font-display font-bold text-xs sm:text-sm text-white text-center px-2">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <TestimonialOrbit />
    </>
  );
}

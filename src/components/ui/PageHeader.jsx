import Reveal from "./Reveal";

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative pt-40 pb-20 bg-black bg-grid overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-brand-red/15 blur-[110px]" />
      <div className="pointer-events-none absolute -top-10 right-1/4 w-80 h-80 rounded-full bg-neon-purple/15 blur-[110px]" />
      <div className="relative max-w-4xl mx-auto px-5 md:px-8 text-center">
        <Reveal direction="up">
          {eyebrow && (
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-brand-pink mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white text-glow">
            {title}
          </h1>
          {subtitle && <p className="mt-5 text-silver text-lg max-w-2xl mx-auto">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}

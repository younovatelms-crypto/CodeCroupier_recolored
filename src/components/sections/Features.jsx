import { motion } from "framer-motion";
import data from "../../data/features.json";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";

function FeatureCard({ item }) {
  return (
    <div
      className="group shrink-0 w-[78vw] sm:w-72 lg:w-80 h-full rounded-[14px] border border-[#262C3A] bg-white/[0.03] p-6
        transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-red/50 hover:shadow-[0_0_30px_rgba(47,212,196,0.25)]"
    >
      <motion.div
        animate={{ y: [0, -4, 0], rotate: [0, -3, 3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white
          bg-gradient-to-br from-brand-crimson via-black to-neon-purple/30
          border border-brand-red/50 shadow-[0_0_18px_rgba(47,212,196,0.3)]
          group-hover:shadow-[0_0_28px_rgba(47,212,196,0.5)] transition-shadow"
      >
        <Icon name={item.icon} className="w-6 h-6" />
      </motion.div>
      <h3 className="font-display font-bold text-lg text-white mb-2">{item.title}</h3>
      <p className="text-sm text-silver leading-relaxed">{item.description}</p>
    </div>
  );
}

export default function Features() {
  // Duplicate the list so the track can loop seamlessly from -0% to -50%.
  const track = [...data.items, ...data.items];
  // Slower per extra card so speed feels consistent regardless of item count.
  const duration = data.items.length * 6;

  return (
    <section className="relative py-28 bg-bg-coal overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-neon-purple mb-4">
            {data.eyebrow}
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            {data.title}
          </h2>
          <p className="mt-4 text-silver">{data.subtitle}</p>
        </Reveal>
      </div>

      {/* Full-bleed marquee track, fades at both edges */}
      <div className="group/marquee relative w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          className="flex gap-6 w-max animate-marquee group-hover/marquee:[animation-play-state:paused] px-5 md:px-8"
          style={{ animationDuration: `${duration}s` }}
        >
          {track.map((item, i) => (
            <FeatureCard key={`${item.title}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

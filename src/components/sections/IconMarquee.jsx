import { motion } from "framer-motion";
import data from "../../data/protocolStack.json";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";

function FlipIcon({ item }) {
  return (
    <div
      className="shrink-0 w-36 sm:w-40 flex flex-col items-center gap-4"
      style={{ perspective: "800px" }}
    >
      <motion.div
        className="relative w-20 h-20 sm:w-24 sm:h-24"
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* front face */}
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center
            bg-gradient-to-br from-brand-crimson via-black to-neon-purple/40
            border border-brand-red/40 shadow-[0_0_25px_rgba(47,212,196,0.3)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Icon name={item.icon} className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
        </div>
        {/* back face */}
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center
            bg-gradient-to-br from-neon-purple/30 via-black to-neon-cyan/20
            border border-neon-cyan/50 shadow-[0_0_25px_rgba(47,212,196,0.3)]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse" />
        </div>
      </motion.div>
      <p className="text-xs sm:text-sm font-display font-semibold text-silver-light text-center leading-tight">
        {item.label}
      </p>
    </div>
  );
}

export default function IconMarquee() {
  const track = [...data.icons, ...data.icons];
  const duration = data.icons.length * 4.5;

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-brand-pink mb-4">
            {data.eyebrow}
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            {data.title}
          </h2>
        </Reveal>
      </div>

      <Reveal direction="up">
        <div className="group/iconmarquee relative w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div
            className="flex gap-6 sm:gap-10 w-max animate-marquee-reverse group-hover/iconmarquee:[animation-play-state:paused] px-5 md:px-8 py-2"
            style={{ animationDuration: `${duration}s` }}
          >
            {track.map((item, i) => (
              <FlipIcon key={`${item.label}-${i}`} item={item} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

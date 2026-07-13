import { motion } from "framer-motion";
import { FiCircle } from "react-icons/fi";
import data from "../../data/activity.json";
import Reveal from "../ui/Reveal";

const toneColor = {
  win: "text-profit-green",
  loss: "text-brand-pink",
  neutral: "text-neon-cyan",
};

function EventPill({ event }) {
  return (
    <div className="shrink-0 flex items-center gap-4 rounded-full border border-graphite bg-white/[0.03] pl-4 pr-5 py-3 whitespace-nowrap">
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className={`${toneColor[event.tone]}`}
      >
        <FiCircle className="w-2 h-2 fill-current" />
      </motion.span>
      <div className="flex items-center gap-2 text-sm">
        <span className="font-display font-semibold text-white">{event.type}</span>
        <span className="text-silver-border">·</span>
        <span className="text-silver">{event.detail}</span>
      </div>
      <span className="font-mono text-xs text-silver-border border-l border-graphite pl-4">
        {event.hash}
      </span>
    </div>
  );
}

export default function ActivityTicker() {
  const track = [...data.events, ...data.events];
  const duration = data.events.length * 5;

  return (
    <section className="relative py-24 bg-black bg-grid overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-neon-cyan mb-4">
            {data.eyebrow}
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            {data.title}
          </h2>
          <p className="mt-4 text-silver">{data.subtitle}</p>
        </Reveal>
      </div>

      <Reveal direction="up">
        <div className="group/ticker relative w-full [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div
            className="flex gap-4 w-max animate-marquee group-hover/ticker:[animation-play-state:paused] px-5 md:px-8"
            style={{ animationDuration: `${duration}s` }}
          >
            {track.map((event, i) => (
              <EventPill key={`${event.hash}-${i}`} event={event} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

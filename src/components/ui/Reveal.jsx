import { motion } from "framer-motion";

/**
 * Wraps children in a scroll-triggered slide/fade animation.
 * direction: "left" | "right" | "up"
 */
export default function Reveal({ children, direction = "up", delay = 0, className = "" }) {
  const offset = {
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
    up: { x: 0, y: 40 },
  }[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

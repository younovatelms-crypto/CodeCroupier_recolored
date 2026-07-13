import { motion, useReducedMotion } from "framer-motion";

/**
 * Wraps a routed page in a subtle 3D enter/exit animation.
 * Used from App.jsx around each <Route element={...} />.
 * Respects prefers-reduced-motion by collapsing to a plain fade.
 */
export default function PageTransition({ children }) {
  const reduceMotion = useReducedMotion();

  const variants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: 24, rotateX: 6, scale: 0.985 },
        animate: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
        exit: { opacity: 0, y: -16, rotateX: -4, scale: 0.99 },
      };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200, transformOrigin: "top center", overflowX: "hidden" }}
    >
      {children}
    </motion.div>
  );
}

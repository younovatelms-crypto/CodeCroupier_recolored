import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import data from "../../data/faq.json";
import Reveal from "../ui/Reveal";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative py-24 bg-bg-coal">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <div className="flex flex-col gap-4">
          {data.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.question} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.04}>
                <div className="rounded-[14px] border border-[#262C3A] bg-white/[0.03] overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between text-left px-6 py-5"
                  >
                    <span className="font-display font-semibold text-white">{item.question}</span>
                    <span
                      className={`w-8 h-8 shrink-0 rounded-full border border-brand-red/60 flex items-center justify-center text-brand-red transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <FiPlus />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 overflow-hidden"
                      >
                        <p className="pb-5 text-sm text-silver leading-relaxed">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

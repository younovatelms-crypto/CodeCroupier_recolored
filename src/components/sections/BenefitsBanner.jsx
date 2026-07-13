import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import data from "../../data/howToBenefit.json";
import Reveal from "../ui/Reveal";
import { PrimaryButton, SecondaryButton } from "../ui/Button";
import ChipVisual from "../ui/ChipVisual";

export default function BenefitsBanner() {
  return (
    <section className="relative py-8 bg-black bg-grid overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="rounded-2xl border border-graphite bg-gradient-to-br from-bg-panel to-black p-8 sm:p-12 grid lg:grid-cols-2 gap-10 items-center overflow-hidden relative">
          <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 bg-brand-red/20 blur-[100px] rounded-full" />

          <Reveal direction="left">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight mb-4">
              {data.banner.heading1}
              <br />
              <span className="text-brand-red">{data.banner.heading2}</span>
            </h2>
            <p className="text-silver mb-8 max-w-md">{data.banner.description}</p>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton>{data.banner.primaryCta}</PrimaryButton>
              <SecondaryButton>{data.banner.secondaryCta}</SecondaryButton>
            </div>
          </Reveal>

          <Reveal direction="right" className="flex justify-center">
            <div className="scale-75 sm:scale-90">
              <ChipVisual />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function BenefitsList() {
  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
          {data.benefits.map((b, i) => (
            <Reveal key={b.title} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
              <div className="flex gap-4">
                <span className="w-6 h-6 shrink-0 rounded bg-brand-red/15 border border-brand-red/50 flex items-center justify-center text-brand-red mt-1">
                  <FiCheck className="w-3.5 h-3.5" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-white mb-1">{b.title}</h3>
                  <p className="text-sm text-silver leading-relaxed">{b.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

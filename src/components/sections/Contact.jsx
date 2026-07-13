import { FiMail, FiGlobe } from "react-icons/fi";
import Reveal from "../ui/Reveal";
import { PrimaryButton } from "../ui/Button";

export default function Contact() {
  return (
    <section className="relative py-24 bg-black bg-grid">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="rounded-2xl border border-graphite bg-bg-panel/50 backdrop-blur p-6 sm:p-10 grid lg:grid-cols-2 gap-10">
          <Reveal direction="left">
            <h2 className="font-display font-bold text-2xl text-white mb-6">Drop a Message</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="block text-xs font-mono uppercase tracking-wider text-silver-border mb-2">
                    Full Name
                  </span>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-transparent border-b border-graphite pb-2 text-sm text-silver-light placeholder:text-silver-border focus:outline-none focus:border-brand-red transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-mono uppercase tracking-wider text-silver-border mb-2">
                    Phone Number
                  </span>
                  <input
                    type="tel"
                    placeholder="Optional"
                    className="w-full bg-transparent border-b border-graphite pb-2 text-sm text-silver-light placeholder:text-silver-border focus:outline-none focus:border-brand-red transition-colors"
                  />
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="block text-xs font-mono uppercase tracking-wider text-silver-border mb-2">
                    Email Address
                  </span>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    className="w-full bg-transparent border-b border-graphite pb-2 text-sm text-silver-light placeholder:text-silver-border focus:outline-none focus:border-brand-red transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-mono uppercase tracking-wider text-silver-border mb-2">
                    Subject
                  </span>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full bg-transparent border-b border-graphite pb-2 text-sm text-silver-light placeholder:text-silver-border focus:outline-none focus:border-brand-red transition-colors"
                  />
                </label>
              </div>
              <label className="block">
                <span className="block text-xs font-mono uppercase tracking-wider text-silver-border mb-2">
                  Message
                </span>
                <textarea
                  rows={4}
                  placeholder="Write your message here..."
                  className="w-full bg-transparent border-b border-graphite pb-2 text-sm text-silver-light placeholder:text-silver-border focus:outline-none focus:border-brand-red transition-colors resize-none"
                />
              </label>
              <PrimaryButton type="submit" className="w-full sm:w-auto">
                Send Message
              </PrimaryButton>
            </form>
          </Reveal>

          <Reveal direction="right">
            <h3 className="font-display font-bold text-lg text-white mb-5 border-b border-brand-red/50 inline-block pb-2">
              Contact Details
            </h3>
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-brand-red/10 border border-brand-red/40 flex items-center justify-center text-brand-red">
                  <FiMail />
                </span>
                <span className="font-mono text-sm text-silver-light">hello@codecroupier.io</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-brand-red/10 border border-brand-red/40 flex items-center justify-center text-brand-red">
                  <FiGlobe />
                </span>
                <span className="font-mono text-sm text-silver-light">www.codecroupier.io</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

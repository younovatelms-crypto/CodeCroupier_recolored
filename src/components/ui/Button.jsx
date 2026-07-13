export function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`group relative isolate overflow-hidden px-7 py-3 rounded-full font-display font-bold text-deep-ink
        bg-gradient-to-r from-brand-red to-brand-crimson
        transition-all duration-300 ease-out
        hover:scale-[1.045] hover:shadow-[0_0_38px_rgba(47,212,196,0.6)]
        active:scale-[0.98] ${className}`}
      {...props}
    >
      {/* diagonal shine sweep — replaces the old lift+glow-only hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12
          bg-gradient-to-r from-transparent via-white/50 to-transparent
          -translate-x-[150%] group-hover:translate-x-[350%]
          transition-transform duration-[900ms] ease-out"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`px-7 py-3 rounded-full font-display font-semibold
        bg-black/40 backdrop-blur border border-silver-border text-silver-light
        transition-all duration-300 ease-out
        hover:border-neon-cyan hover:shadow-[0_0_25px_rgba(47,212,196,0.35)] hover:-translate-y-[2px]
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

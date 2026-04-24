import { ArrowRight } from "lucide-react";

const logos = [
  {
    name: "Equisoft",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <polygon points="11,2 20,7 20,15 11,20 2,15 2,7" stroke="white" strokeWidth="1.5" fill="none"/>
        <polygon points="11,6 16,9 16,13 11,16 6,13 6,9" fill="white" fillOpacity="0.4"/>
      </svg>
    ),
  },
  {
    name: "Riipen",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="8" cy="11" r="5.5" stroke="white" strokeWidth="1.5"/>
        <circle cx="14" cy="11" r="5.5" stroke="white" strokeWidth="1.5" fill="white" fillOpacity="0.15"/>
      </svg>
    ),
  },
  {
    name: "Mentimeter",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="13" width="4" height="7" rx="1" fill="white" fillOpacity="0.5"/>
        <rect x="9" y="8" width="4" height="12" rx="1" fill="white" fillOpacity="0.75"/>
        <rect x="16" y="3" width="4" height="17" rx="1" fill="white"/>
      </svg>
    ),
  },
  {
    name: "Artboard Studio",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="18" height="18" rx="2" stroke="white" strokeWidth="1.5"/>
        <rect x="6" y="6" width="10" height="10" rx="1" fill="white" fillOpacity="0.3"/>
        <circle cx="11" cy="11" r="2.5" fill="white"/>
      </svg>
    ),
  },
  {
    name: "Shopify",
    icon: (
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
        <path d="M13.5 2C13.5 2 13 3.5 12.5 4.5C11.8 4.2 11 4 10 4C7.5 4 6 5.8 6 7.5C6 9.5 7.5 10.3 8.8 11C10.5 11.8 12.5 12.8 12.5 15.2C12.5 17 11.2 18.5 9.2 19C9.8 19.8 10.5 20 10.5 20L14 19L16.5 3.5L13.5 2Z" fill="white" fillOpacity="0.9"/>
        <path d="M13.5 2L12.5 4.5C11.8 4.2 11 4 10 4L9.5 2.5L13.5 2Z" fill="white" fillOpacity="0.5"/>
      </svg>
    ),
  },
  {
    name: "Hootsuite",
    icon: (
      <svg width="24" height="22" viewBox="0 0 24 22" fill="none">
        <ellipse cx="12" cy="10" rx="9" ry="8" stroke="white" strokeWidth="1.5"/>
        <circle cx="8.5" cy="9.5" r="1.5" fill="white"/>
        <circle cx="15.5" cy="9.5" r="1.5" fill="white"/>
        <path d="M9 14C9 14 10.5 15.5 12 15.5C13.5 15.5 15 14 15 14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 18V21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Freshbooks",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="4" width="13" height="16" rx="1.5" stroke="white" strokeWidth="1.5"/>
        <path d="M7 9H13M7 12H11M7 15H12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="8" y="2" width="9" height="12" rx="1.5" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: "Wealthsimple",
    icon: (
      <svg width="26" height="22" viewBox="0 0 26 22" fill="none">
        <path d="M2 5L7 17L13 8L19 17L24 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Hero() {
  const allLogos = [...logos, ...logos]; // duplicate for seamless infinite loop

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-zinc-900"
    >
      {/* Background image */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/hero_workhaus.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Left gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.50) 45%, rgba(0,0,0,0.15) 75%, transparent 100%)",
        }}
      />

      {/* Bottom fade for trusted bar */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
        }}
      />

      {/* Main content — vertically centered in the viewport */}
      <div className="relative flex-1 flex items-center w-full">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="max-w-[600px] flex flex-col gap-7">
            <h1 className="text-[40px] sm:text-[58px] lg:text-[84px] leading-[1.0] tracking-[-0.03em] font-bold text-white">
              Coworking,
              <br />
              your way.
            </h1>

            <p className="text-[17px] leading-[1.55] text-white max-w-md">
              Flexible office spaces designed to help you work productively,
              collaborate effectively, and achieve more. Proudly Canadian-owned
              and operated.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#solutions"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-ink text-[15px] font-semibold hover:bg-teal hover:text-white transition-colors group"
              >
                Find a Workspace
                <span className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center group-hover:bg-ink/80 transition-colors">
                  <ArrowRight size={13} />
                </span>
              </a>
              <a
                href="#why-us"
                className="text-[15px] font-medium text-white/70 hover:text-white border-b border-white/30 hover:border-white transition-colors pb-px"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted bar + carousel — pinned to bottom */}
      <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm py-5">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-6 lg:gap-10">
            <p className="shrink-0 text-[12px] font-medium text-white/50 uppercase tracking-[0.12em] whitespace-nowrap">
              Trusted by
              <br />
              <span className="text-white/80 font-semibold text-[14px] normal-case tracking-normal">
                500+ professionals
              </span>
            </p>

            <div className="w-px h-8 bg-white/20 shrink-0" />

            <div className="flex-1 overflow-hidden">
              <div
                className="flex items-center gap-10 w-max"
                style={{ animation: "marquee 22s linear infinite" }}
              >
                {allLogos.map((logo, i) => (
                  <div key={i} className="flex items-center gap-2.5 shrink-0 select-none">
                    <span className="opacity-70">{logo.icon}</span>
                    <span className="text-[15px] font-semibold text-white/60 tracking-tight whitespace-nowrap">
                      {logo.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

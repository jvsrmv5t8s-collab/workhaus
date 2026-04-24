const pillars = [
  {
    title: "Culture",
    description:
      "We believe work should feel good. Our spaces are thoughtfully designed to inspire creativity, focus, and a sense of belonging.",
  },
  {
    title: "Community",
    description:
      "More than shared space — it's a network. Connect with founders, freelancers, and teams who bring energy to every floor.",
  },
  {
    title: "Convenience",
    description:
      "From complimentary beverages to on-site IT support, the details are handled so you can focus on your work.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 lg:py-32 bg-ink text-white">
      <div className="max-w-[1160px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <p className="text-[13px] font-semibold text-yellow uppercase tracking-[0.14em] mb-4">
              Why Workhaus
            </p>
            <h2 className="text-[32px] lg:text-[46px] leading-[1.05] tracking-[-0.02em] font-bold">
              Culture.
              <br />
              Community.
              <br />
              <span className="text-teal">Convenience.</span>
            </h2>
            <p className="mt-6 text-[15px] leading-[1.6] text-white/60 max-w-md">
              Proudly Canadian-owned and operated, Workhaus was built on the
              belief that where you work shapes how you work.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center px-5 py-2.5 rounded-md bg-yellow text-ink text-[14px] font-semibold hover:bg-white transition-colors"
            >
              Book a Free Tour
            </a>
          </div>

          {/* Right: pillars */}
          <div className="flex flex-col">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className={`flex flex-col gap-3 py-8 lg:py-10 ${
                  i !== 0 ? "border-t border-white/10" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[13px] font-mono text-white/30">
                    0{i + 1}
                  </span>
                  <h3 className="text-[24px] lg:text-[28px] font-semibold tracking-tight">
                    {p.title}
                  </h3>
                </div>
                <p className="text-[15px] leading-[1.6] text-white/65 max-w-xl pl-10">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

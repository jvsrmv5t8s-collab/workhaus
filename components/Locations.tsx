import Image from "next/image";

const locations = [
  { city: "Toronto",            count: "10 locations", photo: "/images/toronto.jpg" },
  { city: "Kitchener-Waterloo", count: "1 location",   photo: "/images/kitchener.jpg" },
  { city: "Calgary",            count: "1 location",   photo: "/images/calgary.jpg" },
];

export default function Locations() {
  return (
    <section id="locations" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header row */}
        <div className="flex items-start justify-between gap-8 mb-10">
          <div className="max-w-lg">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.05] tracking-[-0.025em] font-bold text-ink">
              12 locations across Canada
            </h2>
            <p className="mt-4 text-[16px] leading-[1.6] text-ink-soft">
              From downtown Toronto to the tech corridors of Kitchener-Waterloo
              and the energy of Calgary — Workhaus is where Canadian
              professionals choose to do their best work.
            </p>
          </div>
          <a
            href="/tour"
            className="shrink-0 hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-ink text-white text-[14px] font-semibold hover:bg-teal transition-colors mt-2"
          >
            Book a Tour
          </a>
        </div>

        {/* City cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          {locations.map((loc) => (
            <div
              key={loc.city}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4]"
            >
              <Image
                src={loc.photo}
                alt={loc.city}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[11px] font-semibold text-white/50 uppercase tracking-widest mb-1">
                  {loc.count}
                </p>
                <p className="text-[18px] font-bold text-white leading-tight">
                  {loc.city}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 flex sm:hidden justify-center">
          <a
            href="/tour"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-ink text-white text-[14px] font-semibold hover:bg-teal transition-colors"
          >
            Book a Tour
          </a>
        </div>
      </div>
    </section>
  );
}

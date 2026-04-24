import {
  Armchair,
  UserCheck,
  Lock,
  Building2,
  Globe,
  Presentation,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    icon: Armchair,
    title: "Hot Desk",
    subtitle: "Sit anywhere, stay flexible",
    description:
      "Access a shared workspace whenever you need it — no booking, no hassle. Ideal for freelancers, remote workers, and digital nomads.",
  },
  {
    icon: UserCheck,
    title: "Dedicated Desk",
    subtitle: "Your own desk, every day",
    description:
      "Enjoy your personal workstation in a vibrant open space. Perfect for regular use, with lockable storage and 24/7 access included.",
  },
  {
    icon: Lock,
    title: "Private Office",
    subtitle: "Focus and grow with your team",
    description:
      "Enclosed, lockable offices designed for 2–10 people. Fully furnished and customizable — ideal for startups and growing teams.",
  },
  {
    icon: Presentation,
    title: "Meeting Room",
    subtitle: "Where ideas take shape",
    description:
      "Fully equipped rooms for calls, workshops, or presentations — with whiteboards, screens, and unlimited coffee within reach.",
  },
  {
    icon: Building2,
    title: "Corporate Package",
    subtitle: "Built for hybrid teams",
    description:
      "Bespoke office packages with free desk-booking software for staff rotations. Designed for companies that need flexibility at scale.",
  },
  {
    icon: Globe,
    title: "Virtual Office",
    subtitle: "A professional address, anywhere",
    description:
      "A prestigious Canadian business address across three cities, with mail handling and optional phone services included.",
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="bg-canvas py-24 lg:py-32">
      <div className="max-w-[1160px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-24 items-start">

          {/* Left — sticky */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-[13px] font-semibold text-teal uppercase tracking-[0.14em]">
                Solutions
              </p>
              <h2 className="text-[30px] sm:text-[36px] lg:text-[46px] leading-[1.05] tracking-[-0.025em] font-bold text-ink">
                Find your space,
                <br />
                your way.
              </h2>
              <p className="text-[16px] leading-[1.6] text-ink-soft max-w-sm">
                From flexible desks to fully private offices, our workspaces
                are designed to adapt to your pace, your needs — and your flow.
              </p>
            </div>
            <a
              href="/tour"
              className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-white text-[15px] font-semibold hover:bg-teal transition-colors group"
            >
              Book a tour
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Right — stacking cards */}
          <div className="flex flex-col gap-4">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="lg:sticky bg-white rounded-2xl border border-hairline p-7 flex flex-col gap-5 shadow-sm"
                  style={{ top: `${88 + i * 14}px` }}
                >
                  {/* Icon + titles row */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-canvas border border-hairline flex items-center justify-center shrink-0">
                      <Icon size={18} strokeWidth={1.6} className="text-ink-soft" />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-semibold text-ink tracking-tight">
                        {card.title}
                      </h3>
                      <p className="text-[14px] text-mute mt-0.5">{card.subtitle}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-hairline" />

                  {/* Description */}
                  <p className="text-[15px] leading-[1.6] text-ink-soft">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

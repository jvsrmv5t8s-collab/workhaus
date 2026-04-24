import { Star } from "lucide-react";
import Image from "next/image";

const row1 = [
  {
    rating: 5,
    quote: "I've tried cafés, libraries, you name it. Nothing beats the calm and setup here.",
    name: "Charles P.",
    role: "VP, Equisoft",
    avatar: "https://i.pravatar.cc/80?img=11",
  },
  {
    rating: 4.5,
    quote: "We started as 2 founders, now we're a team of 8 in a private office. No friction at all.",
    name: "Tom & Aisha",
    role: "Startup Founders",
    avatar: "https://i.pravatar.cc/80?img=32",
  },
  {
    rating: 5,
    quote: "The people, the space, the coffee — I actually look forward to going to work.",
    name: "Zoe D.",
    role: "Freelance Designer",
    avatar: "https://i.pravatar.cc/80?img=47",
  },
  {
    rating: 4.9,
    quote: "Hot desks during the day, events at night. I get my work done and meet great people.",
    name: "Liam R.",
    role: "Product Manager",
    avatar: "https://i.pravatar.cc/80?img=53",
  },
  {
    rating: 5,
    quote: "Workhaus has been a fantastic partner — incredibly flexible and always responsive.",
    name: "Abiella K.",
    role: "Senior Manager, Riipen",
    avatar: "https://i.pravatar.cc/80?img=25",
  },
];

const row2 = [
  {
    rating: 4.9,
    quote: "The staff were so accommodating. We ended up with a beautiful, bright office for our team.",
    name: "Johanna A.",
    role: "General Manager, Mentimeter",
    avatar: "https://i.pravatar.cc/80?img=44",
  },
  {
    rating: 5,
    quote: "Friendly staff make you feel at home, and the coffee is always flowing. Unbeatable location.",
    name: "Hooman A.",
    role: "CTO, Artboard Studio",
    avatar: "https://i.pravatar.cc/80?img=15",
  },
  {
    rating: 4.8,
    quote: "Switched from a traditional lease and never looked back. The flexibility is a game-changer.",
    name: "Nora G.",
    role: "Startup Founder",
    avatar: "https://i.pravatar.cc/80?img=38",
  },
  {
    rating: 5,
    quote: "Everything just works — internet, the rooms, the team. I can focus entirely on my clients.",
    name: "Marcus T.",
    role: "Independent Consultant",
    avatar: "https://i.pravatar.cc/80?img=6",
  },
  {
    rating: 4.9,
    quote: "The community here is something else. We've closed two partnerships just from meeting neighbours.",
    name: "Priya S.",
    role: "Co-founder, Seedling Labs",
    avatar: "https://i.pravatar.cc/80?img=29",
  },
];

function TestimonialCard({
  rating,
  quote,
  name,
  role,
  avatar,
}: (typeof row1)[0]) {
  return (
    <div className="w-[300px] shrink-0 bg-white rounded-2xl border border-hairline p-6 flex flex-col gap-4">
      {/* Rating */}
      <div className="flex items-center gap-1.5">
        <Star size={14} className="text-yellow fill-yellow" />
        <span className="text-[14px] font-semibold text-ink">{rating}</span>
      </div>

      {/* Quote */}
      <p className="text-[16px] leading-[1.55] text-ink flex-1">&ldquo;{quote}&rdquo;</p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-hairline">
        <Image
          src={avatar}
          alt={name}
          width={36}
          height={36}
          className="rounded-full shrink-0 object-cover"
        />
        <div>
          <p className="text-[13px] font-semibold text-ink">{name}</p>
          <p className="text-[12px] text-mute">{role}</p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  speed = 60,
}: {
  items: typeof row1;
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `${direction === "left" ? "marquee" : "marquee-reverse"} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white overflow-hidden">
      {/* Header */}
      <div className="max-w-[1160px] mx-auto px-6 lg:px-10 text-center mb-14">
        <h2 className="text-[36px] lg:text-[46px] leading-[1.05] tracking-[-0.025em] font-bold text-ink">
          What our members say
        </h2>
        <p className="mt-4 text-[16px] leading-[1.6] text-ink-soft max-w-md mx-auto">
          Our members come for the desks — and stay for the energy, the people,
          and the coffee. Here's what they say:
        </p>
      </div>

      {/* Row 1 — scrolls left */}
      <MarqueeRow items={row1} direction="left" speed={60} />

      {/* Row 2 — scrolls right */}
      <div className="mt-4">
        <MarqueeRow items={row2} direction="right" speed={65} />
      </div>
    </section>
  );
}

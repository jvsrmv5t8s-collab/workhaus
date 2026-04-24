import {
  Armchair,
  Lock,
  UserCheck,
  Users,
  Wifi,
  Clock,
  Coffee,
  Volume2,
  Car,
  Sparkles,
  UtensilsCrossed,
  Leaf,
  Heart,
  PawPrint,
} from "lucide-react";

const amenities = [
  { label: "Hot desks", icon: Armchair },
  { label: "Private offices", icon: Lock },
  { label: "Dedicated desks", icon: UserCheck },
  { label: "Meeting rooms", icon: Users },
  { label: "500 Mbps Wifi", icon: Wifi },
  { label: "24/7 Access", icon: Clock },
  { label: "Ergonomic chairs", icon: Armchair },
  { label: "Barista", icon: Coffee },
  { label: "Soundproof booths", icon: Volume2 },
  { label: "On-site parking", icon: Car },
  { label: "Daily cleaning", icon: Sparkles },
  { label: "Kitchen & lounge", icon: UtensilsCrossed },
  { label: "Calm & green spaces", icon: Leaf },
  { label: "Wellness room", icon: Heart },
  { label: "Dog-friendly", icon: PawPrint },
];

export default function Amenities() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Centred headline */}
        <p className="text-center text-[26px] sm:text-[34px] lg:text-[40px] leading-[1.15] tracking-[-0.025em] font-bold text-ink max-w-[860px] mx-auto">
          Work solo, meet others, or build your team — all in one flexible
          space. Our coworking spaces are designed for comfort, community, and
          deep focus.
        </p>

        {/* Amenity tags */}
        <div className="mt-14 flex flex-wrap justify-center gap-x-2.5 gap-y-2.5 max-w-full sm:max-w-[90%] lg:max-w-[75%] mx-auto">
          {amenities.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-[14px] text-ink-soft px-2 py-1 rounded-full"
              style={{ backgroundColor: "rgba(62,129,129,0.1)" }}
            >
              <Icon size={15} strokeWidth={1.6} className="text-teal shrink-0" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

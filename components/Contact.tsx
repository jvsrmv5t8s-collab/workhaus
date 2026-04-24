"use client";

import { Wifi, Clock, Users, Armchair, MapPin } from "lucide-react";
import Image from "next/image";

const perks = [
  { icon: Wifi, label: "500 Mbps Wi-Fi" },
  { icon: Clock, label: "24/7 Access" },
  { icon: Users, label: "Meeting Rooms" },
  { icon: Armchair, label: "Ergonomic Chairs" },
];

const cities = [
  { name: "Toronto", province: "ON" },
  { name: "Kitchener-Waterloo", province: "ON" },
  { name: "Calgary", province: "AB" },
];

const avatars = [
  "https://i.pravatar.cc/80?img=11",
  "https://i.pravatar.cc/80?img=32",
  "https://i.pravatar.cc/80?img=47",
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-canvas">
      <div className="max-w-[1160px] mx-auto px-6 lg:px-10">
        <div
          className="rounded-3xl px-6 lg:px-16 py-10 lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-20 items-center"
          style={{ backgroundColor: "#000000" }}
        >
          {/* Left */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-[30px] sm:text-[36px] lg:text-[46px] leading-[1.05] tracking-[-0.025em] font-bold text-white">
                Ready to increase
                <br />
                your productivity?
              </h2>
              <p className="text-[16px] leading-[1.6] text-white/60 max-w-sm">
                Join a community of driven professionals built for focus,
                flexibility, and real connection. Your desk is waiting.
              </p>
            </div>

            {/* CTA */}
            <a
              href="/tour"
              className="self-start inline-flex items-center px-6 py-3 rounded-full bg-white text-ink text-[15px] font-semibold hover:bg-teal hover:text-white transition-colors"
            >
              Book a Tour
            </a>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-8">
            {/* Perks */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {perks.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-[15px] text-white/70">
                  <Icon size={16} strokeWidth={1.6} className="text-white/40 shrink-0" />
                  {label}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10" />

            {/* Cities */}
            <div className="flex flex-col gap-3">
              <p className="text-[12px] font-semibold text-white/30 uppercase tracking-[0.12em]">
                Now in 3 cities
              </p>
              <div className="flex flex-wrap gap-2">
                {cities.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10"
                  >
                    <MapPin size={12} className="text-white shrink-0" />
                    <span className="text-[13px] text-white/80 font-medium">{c.name}</span>
                    <span className="text-[11px] text-white/35">{c.province}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10" />

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {avatars.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt="Member"
                    width={36}
                    height={36}
                    className="rounded-full border-2 object-cover"
                    style={{ borderColor: "#000000" }}
                  />
                ))}
              </div>
              <p className="text-[14px] text-white/60">
                Join <span className="text-white font-semibold">500+</span> professionals
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

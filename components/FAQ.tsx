"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    q: "Can I visit before signing up?",
    a: "Absolutely. You can book a free tour anytime — no strings attached. We'll show you around and help you choose the best plan for your needs. Reach out at hello@workhaus.ca or use the contact form.",
  },
  {
    q: "Do you offer day passes?",
    a: "Yes. Day passes are $35 per person and include 9am–5pm access, high-speed WiFi, and complimentary beverages. You can book one through book.workhaus.ca.",
  },
  {
    q: "Are there any hidden fees?",
    a: "None. Your first invoice may include fully refundable deposits for access cards, office keys, and damage deposits — but there are no surprise charges for standard services.",
  },
  {
    q: "What's the difference between a hot desk and a dedicated desk?",
    a: "A hot desk is a flexible, first-come-first-served seat in our shared areas — perfect for those who don't need a permanent spot. A dedicated desk is your own assigned workstation with lockable storage, available every day.",
  },
  {
    q: "What are your opening hours?",
    a: "Members with 24/7 access plans can come and go anytime. Our on-site team is available during standard business hours, Monday through Friday.",
  },
  {
    q: "Is parking included?",
    a: "Parking is not included in membership pricing, but several of our locations have nearby parking options. Ask our team about parking availability at your preferred location.",
  },
  {
    q: "Are boardroom credits included?",
    a: "Yes — all memberships include boardroom credits. The number of credits varies by membership type. Additional meeting room time can be booked through book.workhaus.ca.",
  },
  {
    q: "How do I cancel my membership?",
    a: "We require 30–60 days written notice as outlined in your Membership Agreement. Our team is always happy to discuss alternative options if your needs have changed.",
  },
  {
    q: "Is Workhaus Canadian?",
    a: "Completely. Workhaus is 100% Canadian-owned and operated, with locations in Toronto, Kitchener-Waterloo, and Calgary.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-canvas">
      <div className="max-w-[1160px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-24 items-start">

          {/* Left — sticky */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-7">
            <p className="text-[13px] font-semibold text-teal uppercase tracking-[0.14em]">
              FAQs
            </p>
            <h2 className="text-[30px] sm:text-[36px] lg:text-[46px] leading-[1.05] tracking-[-0.025em] font-bold text-ink">
              Got questions?
              <br />
              We've got answers.
            </h2>
            <p className="text-[16px] leading-[1.6] text-ink-soft max-w-sm">
              Here's everything you might be wondering before joining us — from
              how to book, to what's included, and how flexible it really is.
            </p>
            <a
              href="#contact"
              className="self-start inline-flex items-center px-6 py-3 rounded-full bg-ink text-white text-[15px] font-semibold hover:bg-teal transition-colors"
            >
              Contact us
            </a>
          </div>

          {/* Right — accordion */}
          <div className="flex flex-col divide-y divide-hairline border-t border-hairline">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                >
                  <span className="text-[16px] font-medium text-ink group-hover:text-teal transition-colors">
                    {faq.q}
                  </span>
                  <span className="shrink-0 w-7 h-7 rounded-full border border-hairline flex items-center justify-center text-ink-soft group-hover:border-teal group-hover:text-teal transition-colors">
                    {open === i ? <X size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                {open === i && (
                  <p className="text-[15px] leading-[1.65] text-ink-soft pb-5 max-w-xl">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

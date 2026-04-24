"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Users } from "lucide-react";

const CITIES = ["Toronto", "Kitchener-Waterloo", "Calgary"] as const;
type City = typeof CITIES[number];

const LOCATIONS_BY_CITY: Record<City, string[]> = {
  "Toronto": [
    "181 University Ave",
    "1 Adelaide St E",
    "2 Sheppard Ave E (North York)",
    "901 King St W",
    "20 Richmond St E",
    "180 Dundas St W",
    "212 King St W",
    "56 Temperance St",
    "350 Bay St",
    "215 Spadina Ave",
  ],
  "Kitchener-Waterloo": ["Kitchener-Waterloo"],
  "Calgary": ["Calgary"],
};

const WORKSPACE_TYPES = [
  "Hot Desk",
  "Dedicated Desk",
  "Private Office",
  "Meeting Room",
  "Corporate Package",
  "Virtual Office",
];

export default function TourForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [city, setCity] = useState<City>("Toronto");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-hairline bg-white p-10 lg:p-12 text-center flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-teal-soft/40 flex items-center justify-center">
          <CheckCircle2 size={28} className="text-teal" />
        </div>
        <h3 className="text-[24px] lg:text-[28px] font-bold text-ink tracking-tight">
          Thanks — we'll be in touch!
        </h3>
        <p className="text-[15px] leading-[1.6] text-ink-soft max-w-md">
          A member of the Workhaus team will reach out within one business day
          to confirm your tour details.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 text-[14px] font-semibold text-teal hover:text-ink transition-colors underline underline-offset-4"
        >
          Book another tour
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-hairline bg-white p-8 lg:p-10 flex flex-col gap-10"
    >
      {/* Section 1: What are you looking for? */}
      <div className="flex flex-col gap-6">
        <h2 className="text-[24px] lg:text-[28px] font-bold text-ink tracking-tight">
          What are you looking for?
        </h2>

        <Field label="City" required>
          <select
            name="city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value as City)}
            className={selectCls}
          >
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label={`What ${city} Location?`}>
          <select name="location" defaultValue="" className={selectCls}>
            <option value="" disabled>Please Select</option>
            {LOCATIONS_BY_CITY[city].map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="What type of workspace?" required>
            <select name="workspace" required defaultValue="" className={selectCls}>
              <option value="" disabled>Please Select</option>
              {WORKSPACE_TYPES.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
          </Field>

          <Field label="Headcount" required>
            <div className="relative">
              <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mute pointer-events-none" />
              <input
                name="headcount"
                type="number"
                min={1}
                required
                className={`${inputCls} pl-10`}
                placeholder="1"
              />
            </div>
          </Field>
        </div>

        <Field label="Any Comments?">
          <textarea
            name="comments"
            rows={4}
            className={`${inputCls} resize-none`}
            placeholder="Tell us about your needs, move-in timeline, or any questions…"
          />
        </Field>
      </div>

      {/* Section 2: Booking information */}
      <div className="flex flex-col gap-6">
        <h2 className="text-[24px] lg:text-[28px] font-bold text-ink tracking-tight">
          Booking information
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="First name" required>
            <input
              name="firstName"
              type="text"
              required
              className={inputCls}
              placeholder="First Name"
            />
          </Field>
          <Field label="Last name" required>
            <input
              name="lastName"
              type="text"
              required
              className={inputCls}
              placeholder="Last Name"
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email" required>
            <input
              name="email"
              type="email"
              required
              className={inputCls}
              placeholder="your@workemail.com"
            />
          </Field>
          <Field label="Phone number">
            <input
              name="phone"
              type="tel"
              className={inputCls}
              placeholder="416-555-3432"
            />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink text-white text-[15px] font-semibold hover:bg-teal transition-colors disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Book my tour"}
        <ArrowRight size={15} />
      </button>
    </form>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-hairline bg-white text-[14px] text-ink placeholder:text-mute focus:outline-none focus:border-teal transition-colors";

const selectCls = `${inputCls} appearance-none cursor-pointer pr-10`;

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-semibold text-ink">
        {label}
        {required && <span className="text-teal ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}

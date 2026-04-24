import Image from "next/image";

const footerLinks = {
  Company: [
    { label: "Why Us", href: "#why-us" },
    { label: "Locations", href: "#locations" },
    { label: "FAQ", href: "#faq" },
    { label: "Careers", href: "#" },
  ],
  Solutions: [
    { label: "Private Offices", href: "#solutions" },
    { label: "Hot Desks", href: "#solutions" },
    { label: "Dedicated Desks", href: "#solutions" },
    { label: "Corporate Packages", href: "#solutions" },
    { label: "Virtual Offices", href: "#solutions" },
    { label: "Meeting Space", href: "#solutions" },
  ],
  Resources: [
    { label: "Member Spotlights", href: "#" },
    { label: "Business Resources", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
};

const socials = [
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-hairline">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2 flex flex-col gap-5 max-w-sm">
            <a href="#">
              <Image
                src="/Logo_Web_workhaus_dark.svg"
                alt="Workhaus"
                width={120}
                height={64}
                priority
              />
            </a>
            <p className="text-[14px] leading-[1.6] text-ink-soft">
              Flexible, human-first coworking across Canada. Built for the way
              modern teams actually work.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-md bg-canvas hover:bg-teal hover:text-white text-ink-soft flex items-center justify-center transition-colors"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <p className="text-[12px] font-semibold text-mute uppercase tracking-[0.12em]">
                {heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-ink-soft hover:text-teal transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-mute">
          <p>© 2026 Workhaus. All rights reserved.</p>
          <p>Proudly Canadian-owned and operated.</p>
        </div>
      </div>
    </footer>
  );
}

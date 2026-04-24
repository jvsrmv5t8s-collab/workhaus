import { ArrowRight } from "lucide-react";

const posts = [
  {
    tag: "Neighbourhood",
    title: "Our Haus, Your Neighbourhood: Downtown Kitchener Edition",
    excerpt:
      "Explore the best dining, coffee, and seasonal events that make Downtown Kitchener a standout Canadian neighbourhood.",
    date: "Apr 18, 2026",
    readTime: "5 min read",
  },
  {
    tag: "Haus Tips",
    title: "5 Ways to Make the Most of Your Coworking Membership",
    excerpt:
      "From booking meeting rooms strategically to tapping into the member network — unlock the full value of your membership.",
    date: "Apr 10, 2026",
    readTime: "4 min read",
  },
  {
    tag: "Member Spotlight",
    title: "How Artboard Studio Scaled Their Team Using Workhaus",
    excerpt:
      "We sat down with Hooman Askari, CTO of Artboard Studio, to learn how flexible coworking helped them grow without the overhead.",
    date: "Mar 29, 2026",
    readTime: "6 min read",
  },
];

export default function News() {
  return (
    <section id="news" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[13px] font-semibold text-teal uppercase tracking-[0.14em] mb-4">
              HausNews
            </p>
            <h2 className="text-[36px] lg:text-[52px] leading-[1.05] tracking-[-0.02em] font-bold text-ink">
              Stories from the Haus.
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-teal shrink-0"
          >
            All articles <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group flex flex-col gap-5 cursor-pointer"
            >
              <div
                className="aspect-[16/10] rounded-xl overflow-hidden border border-hairline"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #E8F1F1 0%, #F7F8F8 50%, #FEF3D9 100%)",
                }}
              />
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-[12px] text-mute">
                  <span className="font-semibold text-teal uppercase tracking-wide">
                    {post.tag}
                  </span>
                  <span>·</span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-[20px] leading-[1.3] font-semibold text-ink tracking-tight group-hover:text-teal transition-colors">
                  {post.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-ink-soft">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

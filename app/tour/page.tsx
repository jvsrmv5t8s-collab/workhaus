import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import TourForm from "@/components/TourForm";

export const metadata: Metadata = {
  title: "Book A Tour - Find A Workspace Today | Workhaus",
  description:
    "Ready to come by? Fill out the form below and somebody from the Workhaus team will get back to you soon.",
};

export default function TourPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero-ish top */}
        <section className="pt-32 lg:pt-40 pb-6 bg-canvas">
          <div className="max-w-[780px] mx-auto px-6 lg:px-10">
            <h1 className="text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.05] tracking-[-0.03em] font-bold text-ink">
              Book a tour
            </h1>
            <p className="mt-5 text-[17px] leading-[1.6] text-ink-soft max-w-xl">
              Ready to come by? Fill out the form below and somebody from the
              Workhaus team will get back to you soon.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="pt-4 pb-16 lg:pb-20 bg-canvas">
          <div className="max-w-[780px] mx-auto px-6 lg:px-10">
            <TourForm />
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}

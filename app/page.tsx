import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Amenities from "@/components/Amenities";
import LocationFinder from "@/components/LocationFinder";
import Solutions from "@/components/Solutions";
import Locations from "@/components/Locations";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Amenities />
        <Solutions />
        <Locations />
        <section className="py-24 lg:py-32 bg-canvas">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <LocationFinder />
          </div>
        </section>
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

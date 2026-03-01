import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedPageContent from "../components/AnimatedPageContent";

export const metadata = {
  title: "About — ÈMÍ-ÌGI",
  description: "About ÈMÍ-ÌGI and our story.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-[var(--surface-cream)] pt-24 pb-24 md:pt-32 md:pb-32">
        <AnimatedPageContent title="About">
          <p>
            ÈMÍ-IGI is a design studio dedicated to the creation of functional
            relics—objects made to serve while carrying meaning. Our works are
            shaped by craft, symbolism, and restraint, designed to invite pause
            and presence within a space. We work slowly and intentionally,
            allowing material and form to guide the process rather than trend or
            urgency. Each piece is crafted to honor memory, identity, and the
            quiet power of thoughtful design. ÈMÍ-IGI exists for spaces and
            individuals who value depth over decoration— for works that are not
            merely used, but kept.
          </p>
        </AnimatedPageContent>
      </main>
      <Footer />
    </div>
  );
}

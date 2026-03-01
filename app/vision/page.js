import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedPageContent from "../components/AnimatedPageContent";

export const metadata = {
  title: "Vision — ÈMÍ-ÌGI",
  description: "Our vision and what drives ÈMÍ-ÌGI.",
};

export default function VisionPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-[var(--surface-cream)] pt-24 pb-24 md:pt-32 md:pb-32">
        <AnimatedPageContent title="Vision">
          <p>
            At ÈMÍ-IGI, we create functional relics designed to slow the moment.
            Our works are made to cause pause—objects that hold meaning as much
            as they serve purpose. Through careful craftsmanship, we translate
            what matters most to our clients into forms that live quietly, yet
            powerfully, within their spaces
          </p>
        </AnimatedPageContent>
      </main>
      <Footer />
    </div>
  );
}

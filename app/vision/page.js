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
            Our vision and guiding principles. Replace this placeholder with
            your vision statement and what drives ÈMÍ-ÌGI.
          </p>
        </AnimatedPageContent>
      </main>
      <Footer />
    </div>
  );
}

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
        <AnimatedPageContent title="About ÈMÍ-ÌGI">
          <p>
            Your story goes here. Replace this placeholder with your actual
            about content.
          </p>
        </AnimatedPageContent>
      </main>
      <Footer />
    </div>
  );
}

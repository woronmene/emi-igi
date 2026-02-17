import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "About — ÈMÍ-ÌGI",
  description: "About ÈMÍ-ÌGI and our story.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-[var(--surface-cream)] pt-24 pb-24 md:pt-32 md:pb-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-sans text-3xl font-semibold text-[var(--text-dark)] md:text-4xl">
            About ÈMÍ-ÌGI
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--text-dark)]">
            Your story goes here. Replace this placeholder with your actual
            about content.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import Footer from "./components/Footer";
import AnimatedSectionTitle from "./components/AnimatedSectionTitle";
import { getProducts } from "@/lib/contentful";

// Fetch from Contentful with 10s background revalidation (ISR) for instant load times.
export const revalidate = 10;

export default async function Home() {
  const { sculptedArt, artMarket } = await getProducts();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        {/* Solid / sculpted art — no section title, cream background */}
        {sculptedArt.map((product) => (
          <ProductSection
            key={product.id}
            title={product.title}
            description={product.description}
            imageSrc={product.imageSrc}
            imageAlt={product.imageAlt}
            slug={product.slug}
            isSculpture
          />
        ))}
        {/* Art Market — section title, different background, underlined product titles */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 pt-16 text-center md:pt-24">
            <AnimatedSectionTitle className="text-2xl font-semibold text-[var(--text-dark)] md:text-3xl lg:text-4xl">
              Art Market
            </AnimatedSectionTitle>
          </div>
          {artMarket.map((product) => (
            <ProductSection
              key={product.id}
              title={product.title}
              description={product.description}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
              renderWrapper={false}
              underlineTitle
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

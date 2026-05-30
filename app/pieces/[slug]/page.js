import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { getProductBySlug, getProducts } from "@/lib/contentful";

// Pre-render product pages at build; revalidate hourly (CMS content rarely changes).
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const { sculptedArt, artMarket } = await getProducts();
    const allProducts = [...sculptedArt, ...artMarket];
    return allProducts.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

const sectionHeadingClass =
  "text-[13px] font-bold text-[var(--text-dark)] tracking-widest md:text-xl md:underline lg:text-[18px] md:text-[#494545]";

function detailBodyClass(isArtMarket) {
  return `text-[11px] font-light leading-[20px] md:text-[16px] md:leading-[1.9] ${
    isArtMarket
      ? "text-[#808080] md:text-[#494545]/70"
      : "text-[#524F4F]/80 md:text-[#494545]/70"
  }`;
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-dark)]">
            Not Found
          </p>
          <h1 className="mt-4 text-2xl font-semibold text-[var(--text-dark)]">
            This piece could not be found.
          </h1>
          <Link
            href="/"
            className="mt-8 text-sm font-medium uppercase tracking-[0.18em] underline decoration-[var(--text-dark)]/70 underline-offset-4"
          >
            Back to collection
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const {
    title,
    description,
    imageSrc,
    imageAlt,
    detailIntro,
    delivery,
    authenticity,
    dimensions,
    category,
  } = product;

  const isArtMarket = category === "drawing";
  const bodyClass = detailBodyClass(isArtMarket);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="mx-auto max-w-5xl px-6 py-10 md:py-16 flex flex-col items-center">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--text-dark)] underline decoration-[var(--text-dark)]/70 underline-offset-4 text-center"
        >
          Back
        </Link>

        <div className="mt-8 md:mt-12 w-full max-w-2xl flex justify-center">
          {imageSrc ? (
            <div className="relative aspect-square w-full max-w-xl overflow-hidden">
              <Image
                src={imageSrc}
                alt={imageAlt || title || "Product image"}
                fill
                sizes="(max-width: 768px) 100vw, 576px"
                className="object-contain"
                priority
              />
            </div>
          ) : null}
        </div>

        <section className="mt-8 space-y-10 w-full md:mt-10 md:space-y-24">
          <p className={`mx-auto max-w-3xl text-center ${bodyClass}`}>
            {detailIntro || description}
          </p>

          {(dimensions || delivery || authenticity) && (
            <div className="mx-auto max-w-3xl space-y-10 text-center md:space-y-24">
              {dimensions && (
                <div>
                  <h2 className={`${sectionHeadingClass} mt-4`}>DIMENSIONS</h2>
                  <div
                    className={`mt-4 flex flex-row flex-wrap justify-center gap-8 sm:gap-16 md:gap-24 ${bodyClass}`}
                  >
                    {dimensions.includes("|") ||
                    dimensions.includes(",") ||
                    dimensions.includes(";") ? (
                      dimensions
                        .split(/[|;,]/)
                        .map((part) => part.trim())
                        .filter(Boolean)
                        .map((part, index) => (
                          <div key={index}>{part}</div>
                        ))
                    ) : (
                      <div className="w-full">{dimensions}</div>
                    )}
                  </div>
                </div>
              )}

              {delivery && (
                <div>
                  <h2 className={`${sectionHeadingClass} mt-4`}>DELIVERY</h2>
                  <p className={`mt-3 ${bodyClass}`}>{delivery}</p>
                </div>
              )}

              {authenticity && (
                <div>
                  <h2 className={`${sectionHeadingClass} mt-4`}>
                    AUTHENTICITY
                  </h2>
                  <p className={`mt-3 ${bodyClass}`}>{authenticity}</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

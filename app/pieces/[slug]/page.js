import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { getProductBySlug, getProducts } from "@/lib/contentful";

export const revalidate = 10;

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
  } = product;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="mx-auto max-w-5xl px-6 py-10 md:py-16 flex flex-col items-center">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--text-dark)] underline decoration-[var(--text-dark)]/70 underline-offset-4 text-center"
        >
          Back
        </Link>

        {/* Centered single image without surrounding grey container box */}
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

        {/* Text sections */}
        <section className="mt-6 space-y-10 md:mt-10 md:space-y-24 w-full">
          <p className="mx-auto max-w-3xl text-center text-[15px] leading-[1.9] text-[#494545]/70 md:text-[16px]">
            {detailIntro || description}
          </p>

          {(dimensions || delivery || authenticity) && (
            <div className="mx-auto max-w-3xl space-y-24 text-center">
              {dimensions && (
                <div>
                  <h2
                    className="text-xl font-bold text-[#494545] md:text-xl lg:text-[18px] underline mt-4 tracking-widest"
                  >
                    DIMENSIONS
                  </h2>
                  <div className="mt-4 flex flex-row flex-wrap justify-center gap-8 sm:gap-16 md:gap-24 text-[15px] leading-[1.9] text-[#494545]/70 md:text-[16px]">
                    {dimensions.includes("|") || dimensions.includes(",") || dimensions.includes(";") ? (
                      dimensions
                        .split(/[|;,]/)
                        .map((part) => part.trim())
                        .filter(Boolean)
                        .map((part, index) => (
                          <div key={index} className="font-light">
                            {part}
                          </div>
                        ))
                    ) : (
                      <div className="font-light w-full">
                        {dimensions}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {delivery && (
                <div>
                  <h2
                    className="text-xl font-bold text-[#494545] md:text-2xl lg:text-[18px] underline mt-4 tracking-widest"
                  >
                    DELIVERY
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.9] text-[#494545]/70 md:text-[16px]">
                    {delivery}
                  </p>
                </div>
              )}

              {authenticity && (
                <div>
                  <h2
                    className="text-xl font-bold text-[#494545] md:text-xl lg:text-[18px] underline mt-4 tracking-widest"
                  >
                    AUTHENTICITY
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.9] text-[#494545]/70 md:text-[16px]">
                    {authenticity}
                  </p>
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

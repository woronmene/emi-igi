import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { getProductBySlug } from "@/lib/contentful";
import ProductGallery from "@/app/components/ProductGallery";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Navbar />
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
    gallery,
  } = product;

  // Build gallery: use main image first, then any additional gallery images
  const galleryImages = [
    ...(imageSrc ? [imageSrc] : []),
    ...(gallery || []).filter((url) => url !== imageSrc),
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-10 md:py-16">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--text-dark)] underline decoration-[var(--text-dark)]/70 underline-offset-4"
        >
          Back
        </Link>

        <div className="mb-6 mt-4 text-center">
          <h1 className="text-2xl font-bold text-[var(--text-dark)] md:text-3xl lg:text-4xl tracking-wider">
            {title}
          </h1>
        </div>

        {/* Gallery */}
        <ProductGallery
          galleryImages={galleryImages}
          imageAlt={imageAlt}
          title={title}
        />

        {/* Text sections */}
        <section className="mt-10 space-y-10 md:mt-14 md:space-y-12">
          <p className="mx-auto max-w-3xl text-center text-[15px] leading-[1.9] text-[#494545]/70 md:text-[16px]">
            {detailIntro || description}
          </p>

          {(delivery || authenticity) && (
            <div className="mx-auto max-w-3xl space-y-10 text-center">
              {delivery && (
                <div>
                  <h2
                    className={`text-xl font-bold  text-[#494545] md:text-2xl lg:text-[18px]  underline mt-4`}
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
                    className={`text-xl font-bold text-[#494545] md:text-xl lg:text-[18px] underline mt-4`}
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

import Image from "next/image";
import Link from "next/link";

/**
 * Reusable product showcase section.
 * Desktop: two-column (image left, content right)
 * Mobile: single-column stacked (image, title, description, button)
 * @param {boolean} renderWrapper - If false, only inner content is rendered (parent provides section + bg).
 * @param {string} backgroundClass - Section background when renderWrapper is true.
 * @param {boolean} underlineTitle - Underline the product title (h2).
 */
export default function ProductSection({
  title,
  description,
  imageSrc,
  imageAlt,
  renderWrapper = true,
  backgroundClass = "bg-[var(--surface-cream)]",
  underlineTitle = false,
}) {
  const content = (
    <div className="mx-auto max-w-7xl px-6 py-16 md:flex md:items-center md:gap-12 md:py-24 lg:gap-16">
      {/* Image column */}
      <div className="mb-10 flex-1 md:mb-0 md:max-w-[45%]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:aspect-square">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt || "Product"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          ) : (
            <div
              className="h-full w-full bg-[var(--surface-cream)]"
              aria-hidden
            />
          )}
        </div>
      </div>

      {/* Content column */}
      <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
        <h2
          className={`text-xl font-semibold text-[var(--text-dark)] md:text-2xl lg:text-[24px] ${
            underlineTitle ? "underline" : ""
          }`}
        >
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-[50px] text-[#524F4F] md:mt-6 md:text-lg">
          {description}
        </p>
        <Link
          href="#collect"
          className="mt-8 inline-block rounded-2xl bg-[var(--button-bg)] px-10 py-6 text-base font-medium text-white shadow-md ring-1 ring-black/5 transition-all hover:bg-[var(--accent-brown-light)] md:mt-10"
        >
          Become collector
        </Link>
      </div>
    </div>
  );

  if (renderWrapper) {
    return <section className={backgroundClass}>{content}</section>;
  }
  return content;
}

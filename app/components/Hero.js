import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] w-full md:min-h-[90vh]">
      {/* Background image - dark atmospheric lamp scene */}
      <div className="absolute inset-0">
        <Image
          src="/images/emi-hero.png"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* <div
          className="absolute inset-0 bg-[var(--surface-dark)]/70"
          aria-hidden
        /> */}
      </div>

      {/* Content - centered (pt accounts for fixed navbar) */}
      <div className="absolute z-10 flex flex-col items-center justify-center  bottom-22 left-1/2 -translate-x-1/2 ">
        <h1 className="text-center text-5xl font-semibold tracking-tight text-[var(--text-light)] drop-shadow-lg md:text-7xl lg:text-8xl">
          ÈMÍ-ÌGI
        </h1>
        <Link
          href="#collect"
          className="mt-8 inline-block rounded-[14px] border-2 border-[#FAFAFA]/[0.69] bg-[#FFFFFF]/[0.39] flex items-center justify-center text-center w-[400px] py-4 text-base text-[#FFFFFF] transition-all hover:bg-[#FFFFFF]/[0.5] md:mt-10 md:py-8 md:text-[24px]"
        >
          <span>Become Collector</span>
          {/* <ArrowRightIcon className="w-6 h-6" /> */}
        </Link>
      </div>
    </section>
  );
}

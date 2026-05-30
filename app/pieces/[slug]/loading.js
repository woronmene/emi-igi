export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="mx-auto flex max-w-5xl flex-col items-center px-6 py-10 md:py-16">
        <div className="h-4 w-12 animate-pulse rounded-sm bg-[var(--text-dark)]/10" />
        <div className="mt-8 h-72 w-full max-w-xl animate-pulse bg-[var(--text-dark)]/5 md:mt-12 md:h-96" />
        <div className="mt-8 w-full max-w-3xl space-y-3">
          <div className="mx-auto h-4 w-full animate-pulse rounded-sm bg-[var(--text-dark)]/5" />
          <div className="mx-auto h-4 w-5/6 animate-pulse rounded-sm bg-[var(--text-dark)]/5" />
          <div className="mx-auto h-4 w-2/3 animate-pulse rounded-sm bg-[var(--text-dark)]/5" />
        </div>
      </main>
    </div>
  );
}

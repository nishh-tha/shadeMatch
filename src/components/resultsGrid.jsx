import ShadeCard from "./ShadeCard";

export default function ResultsGrid({ results, brands }) {
  if (!results || results.length === 0) return null;

  return (
    <section className="px-8 py-10 max-w-4xl mx-auto">
      <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6 text-center">
        Closest Matches Found
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((shade) => (
          <ShadeCard
            key={shade.id}
            shade={shade}
            brandName={shade.brand}
            productName={shade.product}
          />
        ))}
      </div>
    </section>
  );
}
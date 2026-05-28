import ShadeCard from "./ShadeCard";

export default function ResultsGrid({ results, brands }) {
  if (!results || results.length === 0) return null;

  return (
    <section style={{ padding: '3rem 2rem 4rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#d4b89a' }} />
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a07856', whiteSpace: 'nowrap' }}>
          Closest Matches Found
        </span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#d4b89a' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {results.map((match) => (
          <ShadeCard
            key={match.shade.id}
            shade={match.shade}
            brandName={match.shade.brand}
            productName={match.shade.product}
            similarity={match.similarity}
          />
        ))}
      </div>
    </section>
  );
}
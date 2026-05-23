export default function Hero() {
  return (
    <section className="relative px-8 pt-16 pb-10 max-w-3xl mx-auto text-center overflow-hidden">
      {/* decorative blob */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c17f5a 0%, #e8c4a0 50%, transparent 70%)', filter: 'blur(40px)' }} />

      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#a07856', textTransform: 'uppercase', marginBottom: '1rem' }}>
        Shade Intelligence
      </p>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#3d2b1f', lineHeight: 1.2, marginBottom: '1.2rem', fontWeight: 400 }}>
        Find your perfect match<br />
        <em style={{ color: '#c17f5a' }}>across every brand.</em>
      </h1>
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.95rem', color: '#8a6545', lineHeight: 1.8, maxWidth: '480px', margin: '0 auto' }}>
        Select your current foundation shade and instantly discover the closest equivalents — matched by color science.
      </p>
    </section>
  );
}
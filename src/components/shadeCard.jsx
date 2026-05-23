export default function ShadeCard({ shade, brandName, productName }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fdf6f0',
      border: '1px solid #e8d5c0',
      borderRadius: '4px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(193,127,90,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Swatch */}
      <div style={{ width: '100%', height: '160px', backgroundColor: `#${shade.hex}` }} />

      {/* Info */}
      <div style={{ padding: '1rem 1.1rem 1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a07856' }}>
          {brandName}
        </span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#3d2b1f', fontWeight: 400 }}>
          {shade.name}
        </span>
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: '#b08060' }}>
          {productName}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: `#${shade.hex}`, border: '1px solid #d4b89a' }} />
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', color: '#b08060', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            #{shade.hex}
          </span>
        </div>
      </div>
    </div>
  );
}
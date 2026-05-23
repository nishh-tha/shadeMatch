export default function Navbar() {
  return (
    <nav className="w-full px-8 py-5 flex items-center justify-between"
      style={{ borderBottom: '1px solid #d4b89a' }}>
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full" style={{ background: 'linear-gradient(135deg, #c17f5a, #e8c4a0)' }} />
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#3d2b1f', letterSpacing: '0.05em' }}>
          ShadeMatch
        </span>
      </div>
      <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: '#a07856', textTransform: 'uppercase' }}>
        Foundation Finder
      </span>
    </nav>
  );
}
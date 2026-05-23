export default function ShadeSelector({
  brands,
  shades,
  selectedBrand,
  selectedShade,
  onBrandChange,
  onShadeChange,
}) {
  const filteredShades = shades.filter((s) => s.brand === selectedBrand);

  const selectStyle = {
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.875rem',
    color: '#3d2b1f',
    backgroundColor: '#fdf6f0',
    border: '1px solid #d4b89a',
    padding: '0.75rem 1rem',
    borderRadius: '2px',
    outline: 'none',
    cursor: 'pointer',
    width: '100%',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c17f5a' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center',
    paddingRight: '2.5rem',
  };

  const labelStyle = {
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.65rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#a07856',
    marginBottom: '0.4rem',
    display: 'block',
  };

  return (
    <section style={{ padding: '1.5rem 2rem 2rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', alignItems: 'flex-end' }}>
        {/* Brand */}
        <div style={{ width: '260px' }}>
          <label style={labelStyle}>Brand</label>
          <select value={selectedBrand} onChange={(e) => onBrandChange(e.target.value)} style={selectStyle}>
            <option value="">— Select Brand —</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        {/* Shade */}
        <div style={{ width: '260px' }}>
          <label style={labelStyle}>Your Shade</label>
          <select
            value={selectedShade}
            onChange={(e) => onShadeChange(e.target.value)}
            disabled={!selectedBrand}
            style={{ ...selectStyle, opacity: !selectedBrand ? 0.4 : 1, cursor: !selectedBrand ? 'not-allowed' : 'pointer' }}
          >
            <option value="">— Select Shade —</option>
            {filteredShades.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name && s.name !== 'NA' ? s.name : s.hex}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
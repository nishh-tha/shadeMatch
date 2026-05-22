export default function ShadeSelector({
  brands,
  shades,
  selectedBrand,
  selectedShade,
  onBrandChange,
  onShadeChange,
}) {
  const filteredShades = shades.filter((s) => s.brand === selectedBrand);

  return (
    <section className="flex flex-col sm:flex-row gap-4 justify-center items-center px-8 py-6">
      {/* Brand Dropdown */}
      <div className="flex flex-col gap-1 w-64">
        <label className="text-xs tracking-widest uppercase text-stone-400">
          Brand
        </label>
        <select
          value={selectedBrand}
          onChange={(e) => onBrandChange(e.target.value)}
          className="bg-white border border-stone-200 text-stone-700 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-stone-400 cursor-pointer"
        >
          <option value="">— Select Brand —</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Shade Dropdown */}
      <div className="flex flex-col gap-1 w-64">
        <label className="text-xs tracking-widest uppercase text-stone-400">
          Your Shade
        </label>
        <select
          value={selectedShade}
          onChange={(e) => onShadeChange(e.target.value)}
          disabled={!selectedBrand}
          className="bg-white border border-stone-200 text-stone-700 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-stone-400 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <option value="">— Select Shade —</option>
          {filteredShades.map((s) => (
            <option key={s.id} value={s.id}>
                #{s.name}
            </option>
        ))}
        </select>
      </div>
    </section>
  );
}
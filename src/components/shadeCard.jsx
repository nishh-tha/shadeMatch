export default function ShadeCard({ shade, brandName, productName }) {
  return (
    <div className="flex flex-col bg-white border border-stone-100 hover:border-stone-300 transition-all duration-300 group">
      {/* Color Swatch */}
      <div
        className="w-full h-28 transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ backgroundColor: shade.hex }}
      />
      {/* Info */}
      <div className="px-4 py-3 flex flex-col gap-1">
        <span className="text-[10px] tracking-widest uppercase text-stone-400">
          {brandName}
        </span>
        <span className="text-sm font-medium text-stone-700">{shade.name}</span>
        <span className="text-[11px] text-stone-400">{productName}</span>
        <div className="flex items-center gap-2 mt-1">
          <div
            className="w-4 h-4 rounded-full border border-stone-200"
            style={{ backgroundColor: shade.hex }}
          />
          <span className="text-[10px] text-stone-400 uppercase tracking-widest">
            {shade.hex}
          </span>
        </div>
      </div>
    </div>
  );
}
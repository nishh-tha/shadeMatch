export default function Navbar() {
  return (
    <nav className="w-full px-8 py-5 flex items-center justify-between border-b border-stone-100">
      <span className="text-xl tracking-widest uppercase font-light text-stone-800 font-[Cormorant_Garamond]">
        ShadeMatch
      </span>
      <span className="text-xs tracking-widest uppercase text-stone-400">
        Foundation Finder
      </span>
    </nav>
  );
}
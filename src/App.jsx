import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ShadeSelector from "./components/ShadeSelector";
import ResultsGrid from "./components/ResultsGrid";
import { fetchBrands, fetchShadesByBrand, fetchMatches } from "./api/shadeApi";

export default function App() {
  const [brands, setBrands] = useState([]);
  const [shades, setShades] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedShade, setSelectedShade] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load brands on page load
  useEffect(() => {
    fetchBrands().then(setBrands);
  }, []);

  // Load shades when brand changes
  async function handleBrandChange(brand) {
    setSelectedBrand(brand);
    setSelectedShade(null);
    setResults([]);
    if (brand) {
      const data = await fetchShadesByBrand(brand);
      setShades(data);
    } else {
      setShades([]);
    }
  }

  // Find matches when shade is selected
  async function handleShadeChange(shadeId) {
    const shade = shades.find((s) => s.id === Number(shadeId));
    setSelectedShade(shade);
    if (shade) {
      setLoading(true);
      const matches = await fetchMatches(shade.hex);
      setResults(matches);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Navbar />
      <Hero />
      <ShadeSelector
        brands={brands.map((b) => ({ id: b, name: b }))}
        shades={shades}
        selectedBrand={selectedBrand}
        selectedShade={selectedShade?.id?.toString() ?? ""}
        onBrandChange={handleBrandChange}
        onShadeChange={handleShadeChange}
      />

      {/* Selected shade preview */}
      {selectedShade && (
        <div className="flex flex-col items-center py-4 gap-2">
          <p className="text-xs tracking-widest uppercase text-stone-400">
            Your Shade
          </p>
          <div
            className="w-16 h-16 rounded-full border-2 border-stone-200 shadow-sm"
            style={{ backgroundColor: `#${selectedShade.hex}` }}
          />
          <p className="text-sm text-stone-600">{selectedShade.productShort?.toUpperCase()} — {selectedShade.hex}</p>
        </div>
      )}

      {loading && (
        <p className="text-center text-xs tracking-widest uppercase text-stone-400 py-4">
          Finding matches...
        </p>
      )}

      <ResultsGrid results={results} brands={brands} />
    </div>
  );
}
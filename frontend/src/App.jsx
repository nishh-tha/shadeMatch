import { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
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
    <div className="min-h-screen" style={{ backgroundColor: '#faf3ec', minHeight: '100vh' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem', gap: '0.75rem' }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a07856' }}>
            Your Shade
          </p>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: `#${selectedShade.hex}`, border: '3px solid #d4b89a', boxShadow: '0 4px 16px rgba(193,127,90,0.2)' }} />
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: '#3d2b1f' }}>
            {selectedShade.name}
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: '#a07856' }}>
            {selectedShade.product}
          </p>
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
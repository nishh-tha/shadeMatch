import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ShadeSelector from "./components/ShadeSelector";
import ResultsGrid from "./components/ResultsGrid";
import { brands, shades } from "./data/shades";
import { findMatches } from "./utils/matchShades";

export default function App() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedShadeId, setSelectedShadeId] = useState("");

  // Find the full shade object from the selected ID
  const selectedShade = shades.find((s) => s.id === Number(selectedShadeId));

  // Run matching logic whenever a shade is selected
  const results = selectedShade ? findMatches(selectedShade, shades) : [];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Navbar />
      <Hero />
      <ShadeSelector
        brands={brands}
        shades={shades}
        selectedBrand={selectedBrand}
        selectedShade={selectedShadeId}
        onBrandChange={(val) => {
          setSelectedBrand(val);
          setSelectedShadeId(""); // reset shade when brand changes
        }}
        onShadeChange={setSelectedShadeId}
      />

      {/* Selected shade preview */}
      {selectedShade && (
        <div className="flex flex-col items-center py-4 gap-2">
          <p className="text-xs tracking-widest uppercase text-stone-400">
            Your Shade
          </p>
          <div
            className="w-16 h-16 rounded-full border-2 border-stone-200 shadow-sm"
            style={{ backgroundColor: selectedShade.hex }}
          />
          <p className="text-sm text-stone-600">{selectedShade.name}</p>
        </div>
      )}

      <ResultsGrid results={results} brands={brands} />
    </div>
  );
}
// Converts a hex color like "#F5D9C8" into { r, g, b }
function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

// Calculates how "far apart" two colors are (lower = more similar)
function colorDistance(hex1, hex2) {
  const a = hexToRgb(hex1);
  const b = hexToRgb(hex2);
  return Math.sqrt(
    Math.pow(a.r - b.r, 2) +
    Math.pow(a.g - b.g, 2) +
    Math.pow(a.b - b.b, 2)
  );
}

// Given a selected shade + all shades, returns the closest match per brand
export function findMatches(selectedShade, allShades) {
  // Exclude the selected shade's own brand
  const otherShades = allShades.filter(
    (s) => s.brand !== selectedShade.brand
  );

  // Group by brand, find closest shade in each brand
  const byBrand = {};
  otherShades.forEach((shade) => {
    const dist = colorDistance(selectedShade.hex, shade.hex);
    if (!byBrand[shade.brand] || dist < byBrand[shade.brand].distance) {
      byBrand[shade.brand] = { ...shade, distance: dist };
    }
  });

  // Return as sorted array (closest first)
  return Object.values(byBrand).sort((a, b) => a.distance - b.distance);
}
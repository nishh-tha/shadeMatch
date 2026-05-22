const BASE_URL = "http://localhost:8080/api";

export async function fetchBrands() {
  const res = await fetch(`${BASE_URL}/brands`);
  return res.json();
}

export async function fetchShadesByBrand(brand) {
  const res = await fetch(`${BASE_URL}/shades?brand=${encodeURIComponent(brand)}`);
  return res.json();
}

export async function fetchMatches(hex) {
  const res = await fetch(`${BASE_URL}/match?hex=${hex}`);
  return res.json();
}
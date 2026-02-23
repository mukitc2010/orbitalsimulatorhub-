/**
 * Sanity Checks — Verify physics and units before AstroBot responds
 */

export interface SanityResult {
  valid: boolean;
  message?: string;
}

export function checkAltitude(altKm: number): SanityResult {
  if (altKm < 160) return { valid: false, message: "Altitude below 160 km is unsustainable (atmospheric drag). Did you mean 400 km (LEO)?" };
  if (altKm > 1_000_000) return { valid: false, message: "Altitude > 1,000,000 km is beyond Earth orbit. Did you mean 35,786 km (GEO)?" };
  return { valid: true };
}

export function checkOrbitRadius(rKm: number): SanityResult {
  if (rKm < 6371) return { valid: false, message: "Orbit radius must be > Earth radius (6,371 km)." };
  if (rKm > 1_500_000_000) return { valid: false, message: "Orbit radius beyond Moon distance. Check units (km?)." };
  return { valid: true };
}

export function checkVelocity(vKmS: number): SanityResult {
  if (vKmS < 0) return { valid: false, message: "Velocity cannot be negative." };
  if (vKmS > 50) return { valid: false, message: "Velocity > 50 km/s is unrealistic for Earth orbit. Check units." };
  return { valid: true };
}

export function checkEccentricity(e: number): SanityResult {
  if (e < 0 || e > 1) return { valid: false, message: "Eccentricity must be between 0 (circle) and 1 (parabola)." };
  return { valid: true };
}

export function checkInclination(iDeg: number): SanityResult {
  if (iDeg < 0 || iDeg > 180) return { valid: false, message: "Inclination must be 0–180°." };
  return { valid: true };
}

export function checkHohmannRadii(r1: number, r2: number): SanityResult {
  const r1Check = checkOrbitRadius(r1);
  if (!r1Check.valid) return r1Check;
  const r2Check = checkOrbitRadius(r2);
  if (!r2Check.valid) return r2Check;
  if (r1 >= r2) return { valid: false, message: "For Hohmann transfer, r2 must be greater than r1." };
  return { valid: true };
}

export function extractAltitude(text: string): number | null {
  const match = text.match(/(\d+(?:\.\d+)?)\s*(?:km|kilometers?)/i) || text.match(/(\d+(?:\.\d+)?)\s*(?:k\s*m)/i);
  if (match) return parseFloat(match[1]);
  const num = text.match(/\b(\d{3,6})\b/);
  if (num) {
    const n = parseInt(num[1], 10);
    if (n >= 200 && n <= 500000) return n;
  }
  return null;
}

export function extractHohmannRadii(text: string): { r1: number; r2: number } | null {
  const nums = text.match(/\d+(?:\.\d+)?/g);
  if (nums && nums.length >= 2) {
    const r1 = parseFloat(nums[0]);
    const r2 = parseFloat(nums[1]);
    if (r1 >= 6371 && r2 > r1) return { r1, r2 };
  }
  if (text.toLowerCase().includes("leo") && text.toLowerCase().includes("geo")) {
    return { r1: 6771, r2: 42164 };
  }
  return null;
}

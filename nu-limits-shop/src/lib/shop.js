export const DEFAULT_SETTINGS = {
  store_name: "NU LIMITS",
  tagline: "Nu Limits Store",
  hero_kicker: "New release",
  hero_caption: "This is concept art using artificial technology & Photoshop",
  panel_description:
    "A combination of modern streetwear with advanced technological wearables, for a unique style.",
  background: "noir",
  currency: "R",
};

export const BACKGROUNDS = [
  { id: "noir", label: "Noir" },
  { id: "aurora", label: "Aurora" },
  { id: "grid", label: "Grid" },
  { id: "ember", label: "Ember" },
];

export function formatPrice(amount, currency = "R") {
  const value = Number(amount) || 0;
  return `${currency}${value.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}`;
}

export function pickSettings(record = {}) {
  return Object.keys(DEFAULT_SETTINGS).reduce((acc, key) => {
    const value = record[key];
    if (value !== undefined && value !== null && value !== "") acc[key] = value;
    return acc;
  }, {});
}
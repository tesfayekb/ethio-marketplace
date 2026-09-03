/**
 * C5a — the lucide icon allowlist.
 *
 * CENSUS VERDICT (step 0b): there was NO allowlist anywhere in the repo before
 * this landing. `categories.icon` is a free-text column and the console's
 * create/edit dialogs render a plain text input (`category-create-icon`,
 * `category-edit-icon`). The suggester therefore needs a constraint of its own,
 * and this file is it: the single server-side authority the model's answer is
 * validated against. The console UI is NOT touched by C5a (that is C5b).
 */
export const ICON_ALLOWLIST = [
  "Car",
  "Bike",
  "Truck",
  "Bus",
  "Plane",
  "Ship",
  "Smartphone",
  "Laptop",
  "Monitor",
  "Headphones",
  "Camera",
  "Tv",
  "Gamepad2",
  "Watch",
  "Shirt",
  "Footprints",
  "Gem",
  "Glasses",
  "Sparkles",
  "Scissors",
  "Home",
  "Building2",
  "Sofa",
  "Bed",
  "Lamp",
  "UtensilsCrossed",
  "Refrigerator",
  "WashingMachine",
  "Hammer",
  "Wrench",
  "PaintRoller",
  "Drill",
  "HardHat",
  "Briefcase",
  "GraduationCap",
  "Stethoscope",
  "Scale",
  "Calculator",
  "Camera",
  "Music",
  "Dumbbell",
  "Trophy",
  "Tent",
  "Mountain",
  "TreePine",
  "Sprout",
  "Tractor",
  "Wheat",
  "Beef",
  "Dog",
  "Cat",
  "Bird",
  "Fish",
  "Baby",
  "ToyBrick",
  "BookOpen",
  "Store",
  "Package",
  "Forklift",
  "Factory",
  "Wallet",
  "MapPin",
  "Heart",
  "Palette",
] as const;

export type AllowedIcon = (typeof ICON_ALLOWLIST)[number];

/** The refusal-proof fallback: always a valid lucide name. */
export const FALLBACK_ICON = "Package";

const NORMALISED = new Map<string, string>(
  ICON_ALLOWLIST.map((name) => [name.toLowerCase(), name]),
);

/** Server-side validation: anything not on the list becomes the fallback. */
export function validateIcon(candidate: unknown): string {
  if (typeof candidate !== "string") return FALLBACK_ICON;
  return NORMALISED.get(candidate.trim().toLowerCase()) ?? FALLBACK_ICON;
}

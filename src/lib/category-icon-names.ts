/**
 * FIX-SCAN-1 ISSUE 4 — THE ONE CATEGORY ICON ALLOWLIST.
 *
 * Before this file there were two lists that had drifted apart: the server-side
 * suggester allowlist (`src/server/category-images/icons.ts`) and the glyph map
 * the rail, the roster and the editor render from. Every ratified category name
 * outside the glyph map fell back to a generic box — the census against the
 * live catalog found 52 such stored names (Vehicles' `CarFront`,
 * Pets & Animals' `PawPrint`, `MoreHorizontal` on all fourteen catch-alls, and
 * the rest).
 *
 * This module is plain data with no dependencies, so BOTH sides import it: the
 * server validates against it, and `src/components/shell/category-glyphs.ts`
 * carries a glyph for every entry — the Record type makes that totality a
 * compile error to break (E6).
 */
export const CATEGORY_ICON_NAMES = [
  "Activity",
  "Anvil",
  "Baby",
  "BabyIcon",
  "BadgeCheck",
  "Banknote",
  "Bed",
  "Beef",
  "Bike",
  "Bird",
  "Bone",
  "Book",
  "BookOpen",
  "Briefcase",
  "Building",
  "Building2",
  "Bus",
  "Cable",
  "Calculator",
  "Calendar",
  "Camera",
  "Car",
  "CarFront",
  "Cat",
  "ChefHat",
  "Clock",
  "Clock3",
  "Code",
  "Coffee",
  "Construction",
  "CookingPot",
  "Cpu",
  "Crown",
  "Dog",
  "DoorOpen",
  "Drill",
  "Droplet",
  "Droplets",
  "Dumbbell",
  "Factory",
  "FerrisWheel",
  "FileCheck",
  "FileText",
  "Fish",
  "FlaskConical",
  "Flower2",
  "Footprints",
  "Forklift",
  "Gamepad2",
  "Gem",
  "Glasses",
  "GraduationCap",
  "Hammer",
  "Hand",
  "HardHat",
  "Headphones",
  "Heart",
  "HeartPulse",
  "Home",
  "Hotel",
  "KeyRound",
  "KeySquare",
  "Keyboard",
  "Lamp",
  "Laptop",
  "Layers",
  "MapPin",
  "Monitor",
  "MoreHorizontal",
  "Mountain",
  "Music",
  "Package",
  "PaintRoller",
  "Paintbrush",
  "Palette",
  "Palmtree",
  "PartyPopper",
  "PawPrint",
  "Phone",
  "Plane",
  "Printer",
  "Refrigerator",
  "Ribbon",
  "Scale",
  "Scissors",
  "Settings",
  "Ship",
  "Shirt",
  "ShoppingBag",
  "Smartphone",
  "Sofa",
  "Sparkles",
  "Sprout",
  "Stethoscope",
  "Store",
  "Tablet",
  "Tent",
  "TicketsPlane",
  "ToyBrick",
  "Tractor",
  "TreePine",
  "Trees",
  "Trophy",
  "Truck",
  "Tv",
  "User",
  "UserSearch",
  "Users",
  "UtensilsCrossed",
  "Wallet",
  "WashingMachine",
  "Watch",
  "Wheat",
  "Wrench",
  "Zap",
] as const;

export type CategoryIconName = (typeof CATEGORY_ICON_NAMES)[number];

/** The refusal-proof fallback: always a valid lucide name. */
export const FALLBACK_ICON_NAME = "Package";

/**
 * UX-2 PART 1 — every catch-all renders ONE glyph, whatever its stored name is:
 * "Other …" means the same thing everywhere in the taxonomy.
 */
export const CATCHALL_ICON_NAME = "MoreHorizontal";

import type { LocationFormValues } from "./location-form-fields";

export function emptyLocationForm(): LocationFormValues {
  return {
    nameEn: "",
    slug: "",
    iso: "",
    aliases: [],
    displayOrder: "0",
    centerLng: "",
    centerLat: "",
  };
}

/** Both coordinates are required at city and sub-city level. */
export function coordinatesRequired(level: string): boolean {
  return level === "city" || level === "sub_city";
}

import type { CategoryFormValues } from "./category-form-fields";

export function emptyCategoryForm(): CategoryFormValues {
  return {
    nameEn: "",
    icon: "",
    parentId: "",
    allowListings: true,
    priceEnabled: true,
    expiryDays: "",
    visibleFrom: "",
    visibleUntil: "",
    excludedCodes: [],
    positionBefore: "",
  };
}

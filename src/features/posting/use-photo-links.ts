import { useQuery } from "@tanstack/react-query";

import { linksOf, type PhotoLinks } from "./photo-links";
import { supabase } from "@/integrations/supabase/client";

/** The route caps a request at thirty photos (src/server/media/links.ts); a listing holds ten. */
const MAX_PHOTOS = 30;

export async function readPhotoLinks(photoIds: string[]): Promise<PhotoLinks> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token ?? null;
  const response = await fetch("/api/media/photo-links", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token === null ? {} : { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ photoIds }),
  });
  if (!response.ok) throw new Error(`photo links: ${response.status}`);
  return linksOf(await response.json());
}

/**
 * INC-588 / D151 — the links of these stored photos, read once per set of
 * photos and kept 45 minutes (they expire after 60). A failed read leaves every
 * photo as "no photo" (the category's picture), never a broken image.
 */
export function usePhotoLinks(photos: readonly { id: string }[]): PhotoLinks | undefined {
  const ids = [...new Set(photos.map((photo) => photo.id).filter((id) => id !== ""))]
    .sort()
    .slice(0, MAX_PHOTOS);
  return useQuery({
    queryKey: ["media", "photo-links", ids.join(",")],
    queryFn: () => readPhotoLinks(ids),
    enabled: ids.length > 0,
    staleTime: 45 * 60_000,
    gcTime: 50 * 60_000,
    retry: 2,
  }).data;
}

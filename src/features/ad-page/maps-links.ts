import { pathToNode, type TreeNode } from "@/components/shell/location-data";

export function mapsPlaceQuery(nodes: TreeNode[], coverage: string[]): string {
  const paths = coverage.map((id) => pathToNode(nodes, id)).filter((path) => path.length > 0);
  const first = paths[0];
  if (!first) return "";
  const common = first.filter((node, index) => paths.every((path) => path[index]?.id === node.id));
  return common.reverse().map((node) => node.nameEn ?? node.slug).join(", ");
}

export function webPlaceUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function webPinUrl(lat: number | string, lng: number | string): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`;
}

export function appPlaceUrl(query: string): string {
  return `comgooglemaps://?q=${encodeURIComponent(query)}`;
}

export function appPinUrl(lat: number | string, lng: number | string, zoom: number): string {
  return `comgooglemaps://?q=${lat},${lng}&center=${lat},${lng}&zoom=${zoom}`;
}

export function isIosHomeScreen(): boolean {
  return typeof navigator !== "undefined" &&
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
}

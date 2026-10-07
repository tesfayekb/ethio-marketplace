/**
 * The own-key rule (bundle 7 Part H1): a lookup whose key arrives from outside
 * the code — a URL, storage, a request body, a row — reads only the members the
 * map was written with, never one every object inherits ("constructor",
 * "toString", "__proto__" …). A miss answers undefined, as for an unlisted key.
 */
export function ownValue<V>(map: Readonly<Partial<Record<string, V>>>, key: string): V | undefined {
  return Object.prototype.hasOwnProperty.call(map, key) ? map[key] : undefined;
}

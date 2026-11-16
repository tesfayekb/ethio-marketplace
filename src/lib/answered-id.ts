/**
 * The one reader of a door's `{ ok: true, id }` answer (DEC-333; F1-5a moved it here from
 * categories-service so a console that reads it carries no other console's client).
 */
export function answeredId(door: string, data: unknown): string {
  if (typeof data === "object" && data !== null && Reflect.get(data, "ok") === true) {
    const id: unknown = Reflect.get(data, "id");
    if (typeof id === "string" && id !== "") return id;
  }
  throw new Error(`${door} answered without an id`);
}

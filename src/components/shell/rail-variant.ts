import { createContext } from "react";

/** The persistent rail, phone icon strip and opened phone menu. */
export const RailVariantContext = createContext<"rail" | "strip" | "menu">("rail");

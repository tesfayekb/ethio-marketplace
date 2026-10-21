import { enAdmin } from "./en-admin";
import { enBase } from "./en-base";

// The whole English catalogue: the first-paint part and the admin part (DEC-231); tests, scripts and the strings console read it, the first paint reads en-base.ts only.
export const en = { ...enBase, ...enAdmin } as const;

export default en;

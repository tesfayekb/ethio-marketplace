import { enAdmin } from "./en-admin";
import { enBase } from "./en-base";
import { enMember } from "./en-member";

// The whole English catalogue: the first-paint part and the strings layers (DEC-231, DEC-258); tests, scripts and the strings console read it, the first paint reads en-base.ts only.
export const en = { ...enBase, ...enAdmin, ...enMember } as const;

export default en;

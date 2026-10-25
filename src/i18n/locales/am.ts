import type { Messages } from "../types";
import { amAdmin } from "./am-admin";
import { amBase } from "./am-base";
import { amMember } from "./am-member";

export const am: Messages = { ...amBase, ...amAdmin, ...amMember };

export default am;

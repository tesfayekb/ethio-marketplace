import type { Messages } from "../types";
import { amAdmin } from "./am-admin";
import { amBase } from "./am-base";

export const am: Messages = { ...amBase, ...amAdmin };

export default am;

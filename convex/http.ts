import type { ApiFromModules } from "convex/server";
import { api } from "./_generated/api.js";

export { api };
export type Api = ApiFromModules<typeof import("./_generated/api.js")>;
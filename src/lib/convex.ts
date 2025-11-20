import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "convex/react-auth";
import { AuthState } from "convex/server";

export const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL!);
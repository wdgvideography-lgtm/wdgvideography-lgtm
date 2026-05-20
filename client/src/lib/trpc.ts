import { createTRPCReact } from "@trpc/react-query";
import type { AnyRouter } from "@trpc/server";

// Stub type for frontend-only build (server not bundled)
type AppRouter = AnyRouter;

export const trpc = createTRPCReact<AppRouter>();

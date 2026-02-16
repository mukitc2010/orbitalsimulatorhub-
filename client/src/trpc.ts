import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "../../server/routers";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return window.location.origin;
  return "http://localhost:3000";
};

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: getBaseUrl() + "/api/trpc",
      transformer: superjson,
    }),
  ],
});

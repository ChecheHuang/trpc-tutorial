import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  loggerLink,
  wsLink,
  splitLink,
} from "@trpc/client";
import { AppRouter } from "../../server/api";

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    splitLink({
      condition: (op) => {
        return op.type === "subscription";
      },
      true: wsLink({
        client: createWSClient({
          url: "ws://localhost:3000/trpc",
        }),
      }),
      false: httpBatchLink({
        url: "http://localhost:3000/trpc",
      }),
    }),
  ],
});

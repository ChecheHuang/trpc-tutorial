import { initTRPC, inferAsyncReturnType, TRPCError } from "@trpc/server";
import { createContext } from "./context";
export const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();
export const router = t.router;
export const procedure = t.procedure;

const isAdminMiddware = t.middleware(({ ctx, next }) => {
  if (!ctx.isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { user: { id: 1 } } });
});

export const adminProcedure = t.procedure.use(isAdminMiddware);

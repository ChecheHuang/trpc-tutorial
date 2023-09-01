import { userRouter } from "./user";
import { router, procedure, adminProcedure } from "../trpc";

export const appRouter = router({
  sayHi: procedure.query(() => {
    return "Hi";
  }),
  logToServer: procedure
    .input((v) => {
      if (typeof v === "string") return v;
      throw new Error("invalid input");
    })
    .mutation((req) => {
      console.log(`Client says ${req.input}`);
      return true;
    }),
  secretData: adminProcedure.query(({ ctx }) => {
    console.log(ctx.user);
    return "通過認證";
  }),
  users: userRouter,
});

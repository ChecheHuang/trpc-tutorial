import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

// export function createContext(options: CreateExpressContextOptions) {
//   return {
//     req: options.req,
//     res: options.res,
//     isAdmin: false,
//   };
// }
export function createContext() {
  return {
    isAdmin: false,
  };
}

import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { commentRouter } from "@/server/api/routers/comment";

export const appRouter = createTRPCRouter({
  comment: commentRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);

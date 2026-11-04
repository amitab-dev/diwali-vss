import { desc } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { comments } from "@/server/db/schema";

function getIp(headers: Headers) {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    null
  );
}

function getLocation(headers: Headers) {
  const parts = [
    headers.get("x-vercel-ip-city"),
    headers.get("x-vercel-ip-country-region"),
    headers.get("x-vercel-ip-country"),
  ]
    .filter(Boolean)
    .map((p) => decodeURIComponent(p!));
  return parts.length ? parts.join(", ") : null;
}

export const commentRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) =>
    ctx.db
      .select({
        id: comments.id,
        name: comments.name,
        comment: comments.comment,
        location: comments.location,
        createdAt: comments.createdAt,
      })
      .from(comments)
      .orderBy(desc(comments.createdAt)),
  ),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().trim().min(1).max(100),
        comment: z.string().trim().min(1).max(1000),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [row] = await ctx.db
        .insert(comments)
        .values({
          ...input,
          ip: getIp(ctx.headers),
          location: getLocation(ctx.headers),
        })
        .returning({ id: comments.id });
      return row;
    }),
});

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const characterRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(2).max(12) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.character.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.character.findMany({
      orderBy: { createdAt: "asc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.character.findUnique({
        where: { createdBy: { id: ctx.session.user.id }, id: input.id },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.character.delete({
        where: {
          id: input.id,
          createdBy: { id: ctx.session.user.id },
        },
      });
    }),
});

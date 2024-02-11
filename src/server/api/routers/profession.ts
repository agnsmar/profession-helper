import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const professionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.enum([
          "ALCHEMY",
          "BLACKSMITHING",
          "ENCHANTING",
          "ENGINEERING",
          "INSCRIPTION",
          "JEWELCRAFTING",
          "LEATHERWORKING",
          "TAILORING",
          "HERBALISM",
          "MINING",
          "SKINNING",
        ]),
        characterID: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.profession.create({
        data: {
          name: input.name,
          characterId: input.characterID,
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

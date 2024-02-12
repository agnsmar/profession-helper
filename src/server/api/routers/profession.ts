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

  getAll: protectedProcedure
    .input(z.object({ characterId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.profession.findMany({
        orderBy: { createdAt: "asc" },
        where: { characterId: input.characterId },
      });
    }),
});

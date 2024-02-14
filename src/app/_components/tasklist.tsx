"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export const TaskList = (props: { id: string }) => {
  const professions = api.profession.getAll.useQuery({
    characterId: Number(props.id),
  });

  if (!professions.data) return null;

  return (
    <div className="flex flex-wrap gap-8">
      {professions.data.map((profession, index) => {
        return (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-md bg-gray-600 p-4"
          >
            <h3 className="text-center text-xl font-semibold tracking-tight">
              {profession.name}
            </h3>
            <Task name="Mettle" done={true} />
            <Task name="Instructor Quest" done={true} />
            <Task name="Niffen/Consortium Quest" done={true} />
            <Task name="Crafting Orders" done={true} />
            <Task name="Treatise" done={true} />
            <Task name="Expedition Drops" done={true} />
            <Task name="World Drops" done={true} />
            <button className="text h-12 w-12 rounded-md border bg-gray-700">
              -
            </button>
          </div>
        );
      })}
      {professions.data.length < 2 && <ProfessionSelector id={props.id} />}
    </div>
  );
};

const Task = (props: { name: string; done: boolean }) => {
  return (
    <div className="rounded-lg p-1 hover:bg-gray-500">
      <div className="m-1 flex w-64 items-center justify-between border-b-2 border-dotted">
        <h3>{props.name}</h3>
        <input
          className="m-1 h-5 w-5 "
          type="checkbox"
          defaultChecked={props.done}
        />
      </div>
    </div>
  );
};

const ProfessionSelector = (props: { id: string }) => {
  const router = useRouter();
  enum professions {
    Alchemy = "ALCHEMY",
    Blacksmithing = "BLACKSMITHING",
    Enchanting = "ENCHANTING",
    Engineering = "ENGINEERING",
    Inscription = "INSCRIPTION",
    Jewelcrafting = "JEWELCRAFTING",
    Leatherworking = "LEATHERWORKING",
    Tailoring = "TAILORING",
    Herbalism = "HERBALISM",
    Mining = "MINING",
    Skinning = "SKINNING",
  }

  const createProfession = api.profession.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="flex h-32 w-64 select-none flex-col items-center justify-center gap-2 rounded-md bg-gray-600 p-4">
      <button className="text h-12 rounded-md border bg-gray-700 p-2 text-xl font-semibold tracking-tight">
        Add Profession
      </button>
      <div className="fixed left-1/2 top-auto rounded-md border bg-slate-500">
        <div className="hidden w-full justify-between rounded-t-md border-b bg-slate-600 p-2">
          <div className="w-full text-center text-lg font-semibold tracking-tight">
            Choose Profession
          </div>
          <button className="h-6 w-6 self-center rounded-md border bg-red-600 text-center">
            X
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 p-2">
          {Object.keys(professions).map((prof, index) => {
            return (
              <button
                className="basis-1/2 rounded-md border border-slate-400 bg-slate-600 px-2 py-1 font-semibold tracking-tight"
                onClick={(e) =>
                  createProfession.mutate({
                    name: professions.Alchemy,
                    characterID: Number(props.id),
                  })
                }
                key={index}
              >
                {prof}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

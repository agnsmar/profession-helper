"use client";

import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";

export const Character = (props: { id: string }) => {
  const character = api.character.get.useQuery({ id: Number(props.id) });

  if (!character.data) return null;

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <h1 className="text-3xl font-extrabold tracking-tight underline">
        {character.data?.name}
      </h1>
      <h2 className="text-2xl font-extrabold tracking-tight">Dragonflight</h2>

      <div className="flex flex-wrap gap-8">
        <div className="flex flex-col gap-2 rounded-md bg-gray-600 p-4">
          <h3 className="text-xl font-semibold tracking-tight">
            Profession Name
          </h3>
          <Task name="Mettle" done={true} />
          <Task name="Instructor Quest" done={true} />
          <Task name="Niffen/Consortium Quest" done={true} />
          <Task name="Crafting Orders" done={true} />
          <Task name="Treatise" done={true} />
          <Task name="Expedition Drops" done={true} />
          <Task name="World Drops" done={true} />
        </div>
        <div className="flex flex-col gap-2 rounded-md bg-gray-600 p-4">
          <h3 className="text-xl font-semibold tracking-tight">
            Profession Name
          </h3>
          <Task name="Mettle" done={true} />
          <Task name="Instructor Quest" done={true} />
          <Task name="Niffen/Consortium Quest" done={true} />
          <Task name="Crafting Orders" done={true} />
          <Task name="Treatise" done={true} />
          <Task name="Expedition Drops" done={true} />
          <Task name="World Drops" done={true} />
        </div>
      </div>

      <DeleteCharacter id={props.id} />
    </div>
  );
};

const Task = (props: { name: string; done: boolean }) => {
  return (
    <div className="flex w-64 items-center justify-between rounded-md border border-gray-400 bg-gray-500 p-2">
      <h3>{props.name}</h3>
      <input className="h-5 w-5" type="checkbox" defaultChecked={props.done} />
    </div>
  );
};

const DeleteCharacter = (props: { id: string }) => {
  const router = useRouter();
  const deleteCharacter = api.character.delete.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        deleteCharacter.mutate({ id: Number(props.id) });
      }}
      className="flex flex-col gap-2"
    >
      <button
        type="submit"
        className="w-min select-none text-nowrap rounded-md bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={deleteCharacter.isLoading}
      >
        {deleteCharacter.isLoading ? "Deleting..." : "Delete Character"}
      </button>
    </form>
  );
};

"use client";

import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";

export const Character = (props: { id: string }) => {
  const character = api.character.get.useQuery({ id: Number(props.id) });

  if (!character.data) return null;

  return (
    <div className="flex flex-col gap-4 p-2">
      <h1 className="text-3xl font-extrabold tracking-tight underline">
        {character.data?.name}
      </h1>
      <h2 className="text-2xl font-extrabold tracking-tight">Dragonflight</h2>

      <div className="flex w-[800px] flex-col">
        <DeleteCharacter id={props.id} />
      </div>
    </div>
  );
};

const DeleteCharacter = (props: { id: string }) => {
  const router = useRouter();
  const deleteCharacter = api.character.delete.useMutation({
    onSuccess: () => {
      router.prefetch("/");
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

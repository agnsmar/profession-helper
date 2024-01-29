"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateCharacter() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const createCharacter = api.character.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  const deleteCharacter = api.character.delete.useMutation({
    onSuccess: () => {
      router.refresh();
      setId("");
    },
  });

  return (
    <div className="flex flex-col gap-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCharacter.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createCharacter.isLoading}
        >
          {createCharacter.isLoading ? "Creating..." : "Create"}
        </button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteCharacter.mutate({ id: parseInt(id) });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createCharacter.isLoading}
        >
          {createCharacter.isLoading ? "Removing..." : "Remove"}
        </button>
      </form>
    </div>
  );
}

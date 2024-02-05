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
    <div className="p-2">
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
          className="w-full rounded-md px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-md bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createCharacter.isLoading}
        >
          {createCharacter.isLoading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
}

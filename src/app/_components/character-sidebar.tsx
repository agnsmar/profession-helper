import { CreateCharacter } from "./create-character";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export async function Characters() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const characters = await api.character.getAll.query();

  return (
    <div className="flex min-h-full w-64 flex-col justify-between bg-slate-700">
      <div className="flex flex-grow flex-col  gap-1 border-black p-1 font-normal">
        {characters.map((character, index) => {
          return (
            <div
              key={index}
              className="flex h-12 w-full items-center justify-center rounded-lg border-2 border-gray-800 bg-gray-700 text-center text-lg hover:border-gray-400 hover:bg-gray-600"
            >
              {character.name}
            </div>
          );
        })}
      </div>
      <div className="border-t-gray-900 bg-gray-700 p-2">
        <CreateCharacter />
      </div>
    </div>
  );
}

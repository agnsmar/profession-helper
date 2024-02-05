import { CreateCharacter } from "./create-character";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export async function Characters() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const characters = await api.character.getAll.query();

  return (
    <div className="relative flex min-h-full flex-col justify-between bg-slate-700">
      <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-500 scrollbar-thumb-rounded-lg flex shrink grow flex-col gap-1 overflow-y-auto border-black p-1 font-normal">
        {characters.map((character, index) => {
          return (
            <div
              key={index}
              className="flex h-12 w-full shrink-0 items-center justify-center rounded-lg border-2 border-gray-800 bg-gray-700 text-center text-lg hover:border-gray-400 hover:bg-gray-600"
            >
              {character.name}
            </div>
          );
        })}
      </div>
      <div className="mb-[110px]"></div>
      <div className="absolute bottom-0 h-[110px]">
        <CreateCharacter />
      </div>
    </div>
  );
}

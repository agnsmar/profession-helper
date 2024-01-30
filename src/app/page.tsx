import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreateCharacter } from "./_components/create-character";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen flex-col bg-gray-800 text-white">
      <Header />
      <div className="flex min-h-full flex-grow flex-row">
        <div className="flex min-h-full w-64 flex-col gap-1 border-black bg-gray-600 p-1 font-bold">
          <div className="w-full rounded-lg border border-black bg-purple-900 text-center text-xl text-black">
            Svenhammed
          </div>
          <div className="w-full rounded-lg border border-black bg-pink-300 text-center text-xl text-black">
            Agnspally
          </div>
          <div className="w-full rounded-lg border border-black bg-green-600 text-center text-xl text-black">
            Augnes
          </div>
          <div className="w-full rounded-lg border border-black bg-orange-400 text-center text-xl text-black">
            Agns
          </div>
          <div className="w-full rounded-lg border border-black bg-purple-500 text-center text-xl">
            Agnsdh
          </div>
        </div>
        <div className="flex min-h-full w-full flex-col border border-black bg-gradient-to-b from-[#2e026d] to-[#15162c] p-2">
          <CurrentCharacter />

          <Characters />
        </div>
      </div>
    </main>
  );
}

async function Header() {
  const session = await getServerAuthSession();
  return (
    <header className="flex h-min flex-row justify-between border-black p-2">
      <h1 className="text-3xl font-extrabold tracking-tight">
        <span className="text-[hsl(280,100%,70%)]">Profession</span> Helper
      </h1>

      <div className="flex flex-row items-center justify-center gap-4">
        <p className="text-white">
          {session && <span>{session.user?.name}</span>}
        </p>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-md bg-white/10 px-2 py-1 font-semibold no-underline transition hover:bg-white/20"
        >
          <span className="text-nowrap">
            {session ? "Sign out" : "Sign in"}
          </span>
        </Link>
      </div>
    </header>
  );
}

async function CurrentCharacter() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const characters = await api.character.getAll.query();

  return (
    <div className="text-black">
      <select>
        <option selected>Choose Character</option>
        {characters.map((character, index) => {
          return (
            <option key={index} value={character.id}>
              {character.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

async function Characters() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const characters = await api.character.getAll.query();

  return (
    <div className="w-full max-w-xs">
      <CreateCharacter />
      <div className="flex flex-col">
        {characters.map((character, index) => {
          return (
            <div key={index}>
              {character.name}, {character.id}
            </div>
          );
        })}
      </div>
    </div>
  );
}

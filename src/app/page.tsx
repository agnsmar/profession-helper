import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { Characters } from "./_components/character-sidebar";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();

  return (
    <main className="flex h-screen shrink flex-row overflow-auto bg-gray-700 text-white">
      <div className="h-full bg-gray-600">
        <div className="flex h-full w-64 shrink flex-col overflow-hidden">
          <Characters />
        </div>
      </div>
      <div className="flex h-full w-full flex-col">
        <Header />
      </div>
    </main>
  );
}

async function Header() {
  const session = await getServerAuthSession();
  return (
    <div className="border-b-1 flex flex-row justify-between border-b-black bg-gray-800 p-2">
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
    </div>
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

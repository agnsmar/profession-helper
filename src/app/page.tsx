import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreateCharacter } from "./_components/create-character";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <header className="flex flex-row justify-between p-2">
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

      <Characters />
    </main>
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

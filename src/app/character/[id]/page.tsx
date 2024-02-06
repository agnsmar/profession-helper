import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { Characters } from "../../_components/character-sidebar";
import { Character } from "../../_components/character";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home({ params }: { params: { id: string } }) {
  noStore();
  const session = await getServerAuthSession();
  const character = await api.character.get.query({ id: Number(params.id) });

  if (!session?.user) return null;
  if (!character) return null;

  return (
    <main className="flex h-screen shrink flex-row overflow-auto bg-gray-700 text-white">
      <div className="h-full bg-gray-600">
        <div className="flex h-full w-64 shrink flex-col overflow-hidden">
          <Characters />
        </div>
      </div>
      <div className="flex h-full w-full flex-col">
        <Header />
        <Character id={params.id} />
      </div>
    </main>
  );
}

async function Header() {
  const session = await getServerAuthSession();
  return (
    <div className="border-b-1 flex flex-row justify-between border-b-black bg-gray-800 p-2">
      <h1 className="text-4xl font-extrabold tracking-tight">
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

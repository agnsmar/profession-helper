import { unstable_noStore as noStore } from "next/cache";

import { Character } from "../../_components/character";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home({ params }: { params: { id: string } }) {
  noStore();
  const session = await getServerAuthSession();
  const character = await api.character.get.query({ id: Number(params.id) });

  if (!session?.user) return null;
  if (!character) return null;

  return <Character id={params.id} />;
}

import { unstable_noStore as noStore } from "next/cache";

import { Character } from "../../_components/character";
import { getServerAuthSession } from "~/server/auth";

export default async function Home({ params }: { params: { id: string } }) {
  noStore();
  const session = await getServerAuthSession();

  if (!session?.user) return null;

  return <Character id={params.id} />;
}

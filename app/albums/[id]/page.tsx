import type { Metadata } from "next";
import { Album } from "@/features/memories";
import repositories from "@/features/memories/repositories";
import type { PathParameters } from "@/services/http";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "アルバム",
};

export default async function Page({ params }: PathParameters<{ id: string }>) {
  const id = (await params).id;

  const [album, pictures] = await Promise.all([
    repositories.albums.get({ id }),
    repositories.pictures.list({ albumId: id }),
  ]);

  return <Album data={{ ...album, cards: pictures }} id={id} />;
}

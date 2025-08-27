import type { Metadata } from "next";
import { Albums } from "@/features/memories";
import repositories from "@/features/memories/repositories";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "アルバム一覧",
};

export default async function Page() {
  return <Albums data={await repositories.albums.list()} />;
}

import { Album } from "@/features/memories";
import type { PathParameters } from "@/services/http";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "アルバム",
};

export default async function Page({ params }: PathParameters<{ id: string }>) {
  return <Album id={(await params).id} />;
}

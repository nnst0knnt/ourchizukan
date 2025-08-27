import type { PathParameters } from "@/services/http";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "思い出",
};

export default async function Page({ params }: PathParameters<{ id: string }>) {
  return <p>{(await params).id}</p>;
}

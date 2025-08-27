import type { Metadata } from "next";
import { Albums } from "@/features/memories";

export const metadata: Metadata = {
  title: "アルバム一覧",
};

export default function Page() {
  return <Albums />;
}

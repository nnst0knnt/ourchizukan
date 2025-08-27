import { Frown } from "lucide-react";

import { Description, Title } from "@/components/elements";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4">
      <Title as="h1" mark={<Frown size={48} />}>
        ここはどこ？
      </Title>
      <Description>
        <p>探しているものはどこか別の場所にあるようです。</p>
      </Description>
    </div>
  );
}

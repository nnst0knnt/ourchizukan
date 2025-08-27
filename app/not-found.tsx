import { Description, Title } from "@/components/elements";

/**
 * 404
 *
 * 存在しないパスへアクセスした場合に表示されるページです。
 */
export default function NotFound() {
  return (
    <div className="flex flex-col gap-4">
      <Title as="h1">うーん...</Title>
      <Description>
        <p>探しているものはどこか別の場所にあるようです。</p>
      </Description>
    </div>
  );
}

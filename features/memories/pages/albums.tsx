import { Description, Title } from "@/components/elements/typography";
import { Container } from "@/components/structures";
import { PullToRefresh } from "@/components/tools";
import { Cards } from "../components/albums/cards";
import { albums } from "../mock";

/**
 * Albums
 *
 * アルバム一覧を表示するページです。
 */
export const Albums = () => {
  return (
    <PullToRefresh>
      <Container>
        <div className="flex flex-col gap-4">
          <Title as="h1">アルバム一覧</Title>
          <Description>
            <p>大切な思い出の写真をアルバムでまとめています。</p>
            <p>アルバムをタップすると、中の写真を見ることができます。</p>
          </Description>
        </div>

        <Cards cards={albums} />
      </Container>
    </PullToRefresh>
  );
};

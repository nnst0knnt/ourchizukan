import { Description, Title } from "@/components/elements/typography";
import { Centered } from "@/components/structures/content/centered";
import { Container } from "@/components/structures/content/container";
import { EmailController } from "../components/email-controller";

/**
 * Enter
 *
 * `おうちずかん`への入口となるページです。
 */
export const Enter = () => (
  <Centered>
    <Container>
      <div className="flex flex-col gap-4">
        <Title as="h1">おうちずかんへようこそ</Title>
        <Description>
          <p>おうちずかんは、大切な思い出を家族で共有するための場所です。</p>
        </Description>
      </div>

      <EmailController />
    </Container>
  </Centered>
);

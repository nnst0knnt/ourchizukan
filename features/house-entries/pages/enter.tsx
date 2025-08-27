import { Description, Title } from "@/components/elements/typography";
import { EmailController } from "../components/email-controller";

/**
 * Enter
 *
 * `おうちずかん`への入口となるページです。
 */
export const Enter = () => (
  <div className="mx-auto flex max-w-lg flex-col gap-6">
    <div className="flex flex-col gap-4">
      <Title as="h1">おうちずかんへようこそ</Title>
      <Description>
        <p>おうちずかんは、大切な思い出を家族で共有するための場所です。</p>
        <p>家族のメールアドレスを入力して、おうちに入りましょう。</p>
      </Description>
    </div>

    <EmailController />
  </div>
);

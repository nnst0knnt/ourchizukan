import { Description, Title } from "@/components/elements/typography";
import { EmailController } from "../components/email-controller";

/**
 * Enter
 *
 * `おうちずかん`への入口となるページです。
 */
export const Enter = () => (
  <div className="mx-auto h-auto max-w-lg sm:h-full sm:content-center">
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
      <div className="flex flex-col gap-4">
        <Title as="h1">おうちずかんへようこそ</Title>
        <Description>
          <p>おうちずかんは、大切な思い出を家族で共有するための場所です。</p>
        </Description>
      </div>

      <EmailController />
    </div>
  </div>
);

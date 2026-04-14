/** Auto-generated type declaration. Do not edit manually. */

import type { ChatMessageByRole } from "./ChatMessageByRole";

export type ChatMessageRenderByItem = (
  messageModel: ChatMessageByRole<"assistant" | "error" | "user">
) => TemplateResult | string;

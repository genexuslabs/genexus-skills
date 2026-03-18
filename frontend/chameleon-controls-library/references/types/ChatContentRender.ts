/** Auto-generated type declaration. Do not edit manually. */

import type { ChatCodeBlockRender } from "./ChatCodeBlockRender";
import type { ChatMessage } from "./ChatMessage";

export type ChatContentRender = (
  message: ChatMessage,
  chatRef: HTMLChChatElement,
  codeBlockRender: ChatCodeBlockRender
) => TemplateResult | string;

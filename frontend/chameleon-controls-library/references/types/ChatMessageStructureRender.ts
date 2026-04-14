/** Auto-generated type declaration. Do not edit manually. */

import type { ChatFileRender } from "./ChatFileRender";
import type { ChatMessage } from "./ChatMessage";
import type { ChatMessageRenderBySections } from "./ChatMessageRenderBySections";

export type ChatMessageStructureRender = (
  message: ChatMessage,
  chatRef: HTMLChChatElement,
  renders: Required<
    Omit<ChatMessageRenderBySections, "messageStructure" | "file">
  > & {
    file: Required<ChatFileRender>;
  }
) => TemplateResult | string;

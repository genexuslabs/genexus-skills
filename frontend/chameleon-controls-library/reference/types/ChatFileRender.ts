/** Auto-generated type declaration. Do not edit manually. */

import type { ChatMessageFile } from "./ChatMessageFile";

export type ChatFileRender = {
  [key in keyof ChMimeTypeFormatMap]?: (
    file: ChatMessageFile,
    chatRef: HTMLChChatElement
  ) => TemplateResult | string;
};

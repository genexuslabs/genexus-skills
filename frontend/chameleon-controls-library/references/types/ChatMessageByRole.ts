/** Auto-generated type declaration. Do not edit manually. */

import type { ChatMessageAssistant } from "./ChatMessageAssistant";
import type { ChatMessageError } from "./ChatMessageError";
import type { ChatMessageSystem } from "./ChatMessageSystem";
import type { ChatMessageUser } from "./ChatMessageUser";

export type ChatMessageByRole<T extends ChatMessageRole> = T extends "system"
  ? ChatMessageSystem
  : T extends "user"
  ? ChatMessageUser
  : T extends "assistant"
  ? ChatMessageAssistant
  : ChatMessageError;

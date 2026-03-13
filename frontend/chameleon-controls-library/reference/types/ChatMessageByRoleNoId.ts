/** Auto-generated type declaration. Do not edit manually. */

import type { ChatMessageAssistant } from "./ChatMessageAssistant";
import type { ChatMessageError } from "./ChatMessageError";
import type { ChatMessageSystem } from "./ChatMessageSystem";
import type { ChatMessageUser } from "./ChatMessageUser";

export type ChatMessageByRoleNoId<T extends ChatMessageRole> =
  T extends "system"
    ? Omit<ChatMessageSystem, "id">
    : T extends "user"
    ? Omit<ChatMessageUser, "id">
    : T extends "assistant"
    ? Omit<ChatMessageAssistant, "id">
    : Omit<ChatMessageError, "id">;

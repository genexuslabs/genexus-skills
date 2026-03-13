/** Auto-generated type declaration. Do not edit manually. */

import type { ChatMessage } from "./ChatMessage";
import type { ChatMessageFile } from "./ChatMessageFile";
import type { LiveKitCallbacks } from "./LiveKitCallbacks";

export type ChatCallbacks = {
  /**
   * Specifies a callback that is executed when the user wants to download the
   * code block as a file.
   *
   * This callback is useful to implement any custom render to manage this
   * action. For example, displaying a dialog to customize the file name that
   * contains the code block to download.
   *
   * If specified, in the default code block render a "download code" button will
   * be displayed in the `code-block__header-actions`.
   */
  downloadCodeBlock?: (plainText: string, language: string) => void;

  /**
   * Specifies a callback to execute before the user adds a new message in the
   * chat. This callbacks is intended to get retrieve the files that the user
   * wants to add in the message.
   *
   * This callback allows developers to implement any custom rendering for
   * attaching files.
   */
  getChatMessageFiles?: () => File[] | Promise<File[]>;

  /**
   * Specifies a set of callback to manage `liveMode` events.
   */
  liveMode?: Pick<LiveKitCallbacks, "activeSpeakersChanged">;

  /**
   * Specifies a callback to execute when the user adds a new message to the
   * chat and waits a response.
   */
  sendChatMessages: (chat: ChatMessage[]) => void;

  /**
   * Specifies a callback to execute when clicking the stop-response button.
   */
  stopResponse?: () => Promise<void>;

  /**
   * Specifies a callback to validate if the current chat message of the user
   * can be send. If `false`, the `sendChatMessages` won't be executed.
   */
  validateSendChatMessage?: (
    chat: ChatMessage,
    files: File[]
  ) => boolean | Promise<boolean>;

  /**
   * Upload a file returning a `ChatFile` type object containing the public URL
   * where the file is stored.
   *
   * When the promise resolve, the `ch-chat` will ensure the returned `ChatFile`
   * has `uploadedState === "uploaded"`. If the promise is reject, the `ch-chat`
   * will set `uploadedState === "failed"` in the returned `ChatFile`.
   */
  uploadFile?: (file: File) => Promise<ChatMessageFile>;
};

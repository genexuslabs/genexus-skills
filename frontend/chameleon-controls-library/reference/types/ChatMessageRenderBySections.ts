/** Auto-generated type declaration. Do not edit manually. */

import type { ChatActionsRender } from "./ChatActionsRender";
import type { ChatCodeBlockRender } from "./ChatCodeBlockRender";
import type { ChatContentRender } from "./ChatContentRender";
import type { ChatFileRender } from "./ChatFileRender";
import type { ChatMessageStructureRender } from "./ChatMessageStructureRender";
import type { ChatSourceRender } from "./ChatSourceRender";

export type ChatMessageRenderBySections = {
  /**
   * Render for additional actions of the message.
   *
   * If `undefined`, a default render for the additional actions will be used.
   */
  actions?: ChatActionsRender;

  /**
   * Render for code blocks.
   *
   * If `undefined`, a default code block render will be used.
   */
  codeBlock?: ChatCodeBlockRender;

  /**
   * Render for content that is placed before the main content of the message.
   *
   * This section doesn't always have to be defined, in fact, it doesn't have a
   * default render.
   */
  contentBefore?: ChatContentRender;

  /**
   * Render for the content of the message.
   *
   * If `undefined`, a default content render will be used.
   */
  content?: ChatContentRender;

  /**
   * Render for content that is placed after the main content of the message.
   *
   * This section doesn't always have to be defined, in fact, it doesn't have a
   * default render.
   */
  contentAfter?: ChatContentRender;

  /**
   * Renders for each file type of the message
   *
   * If `undefined`, a default render for the files will be used.
   */
  file?: ChatFileRender;

  /**
   * Render for the general structure of the message.
   *
   * This render is useful for adding extra elements and widgets for
   * customizing the message structure and content. This render has direct
   * access for all sub-renders of the message (`codeBlock`, `content`, and
   * `files`) for allowing to relocate those render according to the developer
   * needs.
   *
   * If `undefined`, a default structure render will be used.
   */
  messageStructure?: ChatMessageStructureRender;

  /**
   * Render for each source of the message.
   *
   * If `undefined`, a default render for the sources will be used.
   */
  source?: ChatSourceRender;
};

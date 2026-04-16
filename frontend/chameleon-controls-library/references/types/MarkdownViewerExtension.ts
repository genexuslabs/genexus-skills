/** Auto-generated type declaration. Do not edit manually. */

import type { MarkdownViewerExtensionRender } from "./MarkdownViewerExtensionRender";

export type MarkdownViewerExtension<ContentMapping extends object> = {
  /**
   * A syntax extension to change how markdown is tokenized.
   */
  tokenizer: MicromarkExtension;

  /**
   * Change how tokens are turned into a Markdown Abstract Syntax Tree (mdast).
   */
  tokensToMdast?: Partial<MdastExtension> | Partial<MdastExtension>[];

  /**
   * A mapping from the custom mdast nodes to the Lit's `TemplateResult`
   * function. This object should map the new mdast nodes (that this extension
   * gives) to a function that returns `TemplateResult`.
   *
   * @example
   * ```ts
   * const mdastRender = {
   *   buttonReference: (element: ButtonReference) =>
   *     html`<button type="button" @click=${doSomething}>
   *       ${element.value}
   *     </button>`,
   *
   *   emoji: (element: Emoji) => html`${element.value}`
   * } as const satisfies MarkdownViewerExtensionRender<ExtendedContentMapping>
   *
   * type ExtendedContent = ButtonReference | Emoji;
   *
   * type ExtendedContentMapping = {
   *   [key in ExtendedContent["type"]]: Extract<ExtendedContent, { type: key }>;
   * };
   * ```
   */
  mdastRender: MarkdownViewerExtensionRender<ContentMapping>;
};

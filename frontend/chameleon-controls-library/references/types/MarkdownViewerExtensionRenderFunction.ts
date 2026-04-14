/** Auto-generated type declaration. Do not edit manually. */

export type MarkdownViewerExtensionRenderFunction<T> = (
  element: T
) =>
  | Promise<string | TemplateResult | TemplateResult[] | void>
  | string
  | TemplateResult
  | TemplateResult[]
  | void;

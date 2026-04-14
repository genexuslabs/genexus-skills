/** Auto-generated type declaration. Do not edit manually. */

import type { MarkdownViewerExtensionRenderFunction } from "./MarkdownViewerExtensionRenderFunction";

export type MarkdownViewerExtensionRender<ContentMapping extends object> = {
  [key in keyof ContentMapping]: MarkdownViewerExtensionRenderFunction<
    ContentMapping[key]
  >;
};

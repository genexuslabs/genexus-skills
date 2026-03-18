/** Auto-generated type declaration. Do not edit manually. */

export type ChatMessageSource = {
  accessibleName?: string;
  caption?: string;

  /**
   * A field for adding any extra information that must be stored for the
   * source.
   *
   * The `metadata` field can be used for any purpose, for example, adding more
   * information to customize the render.
   */
  metadata?: any;

  /**
   * Parts for the source.
   */
  parts?: string;

  url: string;
};

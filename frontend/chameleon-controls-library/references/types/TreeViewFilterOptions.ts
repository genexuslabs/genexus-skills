/** Auto-generated type declaration. Do not edit manually. */

export type TreeViewFilterOptions = {
  /**
   * When applying a new filter, expand the matches.
   */
  autoExpand?: boolean;

  // /**
  //  * Don't render unmatched items.
  //  */
  // hideUnmatchedItems?: boolean;

  /**
   * `true` to render the items that don't satisfy the predicate condition and
   * hide the items that satisfy the predicate.
   */
  hideMatchesAndShowNonMatches?: boolean;

  /**
   * Only works if `regularExpression` is not used.
   */
  highlightMatchedItems?: boolean;

  /**
   * Determine if the filter takes into account the camel casing.
   * Only works if `regularExpression !== true`
   */
  matchCase?: boolean;
};

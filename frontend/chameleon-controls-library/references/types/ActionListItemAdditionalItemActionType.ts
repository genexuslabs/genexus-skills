/** Auto-generated type declaration. Do not edit manually. */

export type ActionListItemAdditionalItemActionType =
  | {
      type: "fix";
    }
  | {
      type: "modify" | "remove";
      showOnHover?: boolean;
      showAcceptCancel?: boolean;
    }
  | {
      callback?: (id: string) => void;
      type: "custom";
      showOnHover?: boolean;
      showAcceptCancel?: boolean;
    };

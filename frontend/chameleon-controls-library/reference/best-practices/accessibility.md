# Accessibility best practices

Apply these practices when building UIs with Chameleon components

## Accessible names

Provide `accessibleName` (or `accessible-name` attribute) for form controls so assistive technologies can label them:

- **ch-edit** — `accessible-name="Search"` for search inputs
- **ch-combo-box-render** — `accessible-name="Country"` for dropdowns
- **ch-checkbox** — Associate with a visible label or use `accessible-name`
- **ch-slider** — `accessible-name` for range inputs

## Dialog accessibility

- **ch-dialog** — Use `close-button-accessible-name` for the close button (e.g. "Close dialog")
- Ensure dialogs have a focus trap and return focus when closed
- Use `caption` for the dialog title

## Labels

- Use `<label for="id">` when the control has an `id`, or wrap the control in a `<label>`
- For custom controls without native labels, use `aria-label` or `accessibleName`

## Accessibility checker

Chameleon (6.4.0+) includes an accessibility utility that warns when form elements lack valid labels. Supported components:

- ch-combo-box-render
- ch-edit
- ch-progress
- ch-slider

To disable (only if justified):

```ts
import { disableAccessibilityReports } from "@genexus/chameleon-controls-library/dist/collection";
disableAccessibilityReports();
```

## Translations

Many components accept a `translations` prop with `accessibleName` literals (e.g. "Clear search", "Show password"). Provide localized strings for your app's language

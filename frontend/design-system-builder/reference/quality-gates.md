# Quality Gates & Testing

## 9 Quality Gates (CI/CD)

Every PR MUST pass ALL gates before merge:

| # | Gate | Tool | Pass Criterion |
|---|---|---|---|
| 1 | CSS compiles without errors | Dart Sass | Exit code 0 |
| 2 | Token validation | Custom script | Naming + values valid |
| 3 | Naming convention | Stylelint / regex | Pattern `{category}-{concept}-*` |
| 4 | No hardcoded values | PostCSS lint | Only tokens allowed (exceptions: `0`, `transparent`, `100%`) |
| 5 | Bundle size | size-limit | ≤10 KB min / ≤5 KB gz per component |
| 6 | Visual regression | Playwright `toHaveScreenshot()` | No unapproved diffs |
| 7 | Accessibility | axe-core via `@axe-core/playwright` | Zero violations Level AA |
| 8 | Docs sync | `git diff docs/` | Docs updated with code |
| 9 | Lighthouse CI | Lighthouse | Performance ≥ 90, Accessibility ≥ 90 |
| 10 | No em/rem units | PostCSS lint / regex | Zero `em`/`rem` occurrences in generated CSS (unless user-approved) |
| 11 | CSS optimization | CSS audit | No redundant selectors, no duplicate declarations, shared properties grouped |
| 12 | Valid `::part()` selectors | Cross-reference with component's `styling.md` (chameleon-controls-library skill) | Every `::part()` name matches a documented part for the target component |

## 10 Acceptance Criteria Per Component

A component is NOT shippable until it meets ALL of:

1. CSS compiles without errors
2. Documentation complete (`.md` file)
3. Only tokens — zero hardcoded values
4. All states covered (default, hover, focus, active, disabled, error)
5. axe-core zero violations Level AA
6. Visual baseline established
7. Bundle size within budget
8. Naming convention satisfied
9. Logical properties used (RTL-ready)
10. Core team review approved

Recommended (not blocking):
- Do / Don't section in docs
- List of tokens consumed in docs

## Testing Pyramid

```
           ┌──────────┐
          │  Manual    │   Screen readers, keyboard nav
         └────────────┘
       ┌──────────────────┐
      │ Visual Regression  │   Playwright screenshots vs baselines
     └────────────────────┘
   ┌──────────────────────────┐
  │   Accessibility Testing    │   axe-core per component x state
 └────────────────────────────┘
┌──────────────────────────────────┐
│  Unit Tests (tokens, CSS)        │   Naming lint, compilation,
│  Performance budgets              │   contrast check, bundle size
└──────────────────────────────────┘
```

## Versioning

| Type | When | Example |
|---|---|---|
| **PATCH** | Bug fixes, a11y improvements | Fix contrast on `button-primary:disabled` |
| **MINOR** | New components/variants/tokens (additive) | Add `button-tertiary` variant |
| **MAJOR** | Breaking changes (rename/remove tokens, classes) | Rename `--color-primary` → `--color-bg-primary` |

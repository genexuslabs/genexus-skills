# Documentation Standards

## Per-Component Documentation Schema

Create a `.md` file for every component (co-located with its `.css` in `components/`):

```markdown
# {ComponentName}
Bundle: `"{category}/{name}"`
Implementation: [{name}.css](./{name}.css)

## Description
What it is, when to use it, when NOT to use it.

## Classes
### `{class-name}`
- **Applies to:** {elements}
- **Tokens consumed:** --token-a, --token-b
- **States:** default, :hover, :focus-visible, :disabled

## Variants
| Variant | Class | Description |
|---------|-------|-------------|

## States
| State | CSS | Visual Change |
|-------|-----|---------------|

## Accessibility
- **Keyboard:** Tab, Enter/Space, Escape
- **ARIA:** roles, attributes
- **Screen reader:** expected announcements

## Do / Don't
- DO: ...
- DON'T: ...

## Related Components
- {other-component}
```

## SKILL.md Pattern (Dual-Audience Entry Point)

Create `docs/SKILL.md` as the entry point for both humans and AI agents:

```
docs/SKILL.md (entry point)
├── references/
│   ├── component-bundles-table.md    ← Component → bundles mapping
│   ├── bundles-index.md              ← Index with links to all bundle docs
│   ├── themes-and-variants.md        ← Theme documentation
│   ├── api/                          ← JS module documentation
│   └── installation/                 ← Framework-specific setup
```

Requirements:
- Co-locate `.md` and `.css` in the same directory
- Use layered navigation: SKILL.md → index → detail (3 levels)
- Use markdown tables with explicit mappings (machine-parseable)
- Keep framework-agnostic; separate installation docs per framework
- Serve both humans and AI agents (dual audience)

## Changelog

Use `CHANGELOG.md` at the DS root. Follow [Keep a Changelog](https://keepachangelog.com/) format. Group changes by: Added, Changed, Deprecated, Removed, Fixed, Security

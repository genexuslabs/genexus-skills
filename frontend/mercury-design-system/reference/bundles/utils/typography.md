# Typography

Bundle name: `"utils/typography"`

Implementation: [typography.css](./typography.css)

Provides typography classes for all Mercury text styles. Mercury resets `h1`..`h6` and `p` elements (font, margin, padding, color all unset), so always apply these classes explicitly

## Classes

### `heading-1`

Applies to the components: `h1`, `div`, any block element

Main page title. 40px, bold weight (`var(--font-style-bold)`), tight line-height (`var(--line-height-tight)`). Uses `var(--font-family-header)`. Use only once per page

### `heading-2`

Applies to the components: `h2`, `div`, any block element

Section heading. 32px, bold weight, tight line-height. Uses `var(--font-family-header)`

### `heading-3`

Applies to the components: `h3`, `div`, any block element

Subsection heading. 28px, bold weight, tight line-height. Uses `var(--font-family-header)`

### `heading-4`

Applies to the components: `h4`, `div`, any block element

Content heading. 24px, bold weight, tight line-height. Uses `var(--font-family-header)`

### `heading-5`

Applies to the components: `h5`, `div`, any block element

Minor heading. 20px, bold weight, tight line-height. Uses `var(--font-family-header)`

### `heading-6`

Applies to the components: `h6`, `div`, any block element

Minimal heading. 18px, bold weight, tight line-height. Uses `var(--font-family-header)`

### `subtitle-regular-xl`

Applies to the components: `p`, `span`, `div`, any text container

Large subtitle, regular weight. 20px, regular weight (`var(--font-style-regular)`), regular line-height (`var(--line-height-regular)`). Uses `var(--font-family-header)`. Use for section introductions or visual complements to h1/h2

### `subtitle-semi-bold-xl`

Applies to the components: `p`, `span`, `div`, any text container

Large subtitle, semi-bold weight. 20px, semi-bold (`var(--font-style-semi-bold)`), regular line-height. Uses `var(--font-family-header)`

### `subtitle-regular-l`

Applies to the components: `p`, `span`, `div`, any text container

Medium-large subtitle, regular weight. 18px, regular line-height. Uses `var(--font-family-header)`

### `subtitle-semi-bold-l`

Applies to the components: `p`, `span`, `div`, any text container

Medium-large subtitle, semi-bold weight. 18px, regular line-height. Uses `var(--font-family-header)`

### `subtitle-regular-m`

Applies to the components: `p`, `span`, `div`, any text container

Standard subtitle, regular weight. 16px, regular line-height. Uses `var(--font-family-header)`. Common for secondary descriptive text

### `subtitle-semi-bold-m`

Applies to the components: `p`, `span`, `div`, any text container

Standard subtitle, semi-bold weight. 16px, regular line-height. Uses `var(--font-family-header)`

### `subtitle-regular-s`

Applies to the components: `p`, `span`, `div`, any text container

Small subtitle, regular weight. 15px, tight line-height (`var(--line-height-tight)`). Uses `var(--font-family-header)`

### `subtitle-semi-bold-s`

Applies to the components: `p`, `span`, `div`, any text container

Small subtitle, semi-bold weight. 15px, tight line-height. Uses `var(--font-family-header)`

### `subtitle-regular-xs`

Applies to the components: `p`, `span`, `div`, any text container

Extra-small subtitle, regular weight. 14px, tight line-height. Uses `var(--font-family-header)`

### `subtitle-semi-bold-xs`

Applies to the components: `p`, `span`, `div`, any text container

Extra-small subtitle, semi-bold weight. 14px, tight line-height. Uses `var(--font-family-header)`

### `body-regular-xl`

Applies to the components: `p`, `span`, `div`, any text container

Large body text, regular weight. 18px, regular weight (`var(--font-style-regular)`), relaxed line-height (`var(--line-height-relaxed)`). Uses `var(--font-family-body)`. Use for article leads or highlighted content

### `body-semi-bold-xl`

Applies to the components: `p`, `span`, `div`, any text container

Large body text, semi-bold weight. 18px, semi-bold (`var(--font-style-semi-bold)`), relaxed line-height. Uses `var(--font-family-body)`

### `body-italic-xl`

Applies to the components: `p`, `span`, `em`, `i`, any text container

Large body text, italic. 18px, regular weight + `font-style: italic`, relaxed line-height. Uses `var(--font-family-body)`

### `body-regular-l`

Applies to the components: `p`, `span`, `div`, any text container

Medium-large body text, regular weight. 16px, relaxed line-height. Uses `var(--font-family-body)`

### `body-semi-bold-l`

Applies to the components: `p`, `span`, `div`, any text container

Medium-large body text, semi-bold weight. 16px, relaxed line-height. Uses `var(--font-family-body)`

### `body-italic-l`

Applies to the components: `p`, `span`, `em`, `i`, any text container

Medium-large body text, italic. 16px, relaxed line-height. Uses `var(--font-family-body)`

### `body-regular-m`

Applies to the components: `p`, `span`, `div`, any text container

**Standard body text (most common).** 14px, regular weight, relaxed line-height. Uses `var(--font-family-body)`. Default for all general reading content

### `body-semi-bold-m`

Applies to the components: `p`, `span`, `div`, any text container

Standard body text, semi-bold weight. 14px, relaxed line-height. Uses `var(--font-family-body)`. Use for emphasis within body content

### `body-italic-m`

Applies to the components: `p`, `span`, `em`, `i`, any text container

Standard body text, italic. 14px, relaxed line-height. Uses `var(--font-family-body)`. Use for quotes and references

### `body-regular-s`

Applies to the components: `p`, `span`, `div`, any text container

Small body text, regular weight. 12px, relaxed line-height. Uses `var(--font-family-body)`. Use for compact content, dense tables

### `body-semi-bold-s`

Applies to the components: `p`, `span`, `div`, any text container

Small body text, semi-bold weight. 12px, relaxed line-height. Uses `var(--font-family-body)`

### `body-italic-s`

Applies to the components: `p`, `span`, `em`, `i`, any text container

Small body text, italic. 12px, relaxed line-height. Uses `var(--font-family-body)`

### `body-regular-xs`

Applies to the components: `p`, `span`, `div`, any text container

Extra-small body text, regular weight. 11px, relaxed line-height. Uses `var(--font-family-body)`

### `body-semi-bold-xs`

Applies to the components: `p`, `span`, `div`, any text container

Extra-small body text, semi-bold weight. 11px, relaxed line-height. Uses `var(--font-family-body)`

### `body-italic-xs`

Applies to the components: `p`, `span`, `em`, `i`, any text container

Extra-small body text, italic. 11px, relaxed line-height. Uses `var(--font-family-body)`

### `caption-regular-l`

Applies to the components: `span`, `small`, `label`, any inline element

Large caption, regular weight. 11px, regular weight, relaxed line-height. Uses `var(--font-family-body)`. Use for form labels, timestamps, secondary metadata

### `caption-semi-bold-l`

Applies to the components: `span`, `small`, `label`, any inline element

Large caption, semi-bold weight. 11px, semi-bold, relaxed line-height. Uses `var(--font-family-body)`. Use for form labels with emphasis

### `caption-regular-m`

Applies to the components: `span`, `small`, `label`, any inline element

Standard caption, regular weight. 10px, relaxed line-height. Uses `var(--font-family-body)`. Use for metadata, timestamps, auxiliary info

### `caption-semi-bold-m`

Applies to the components: `span`, `small`, `label`, any inline element

Standard caption, semi-bold weight. 10px, relaxed line-height. Uses `var(--font-family-body)`

### `caption-regular-s`

Applies to the components: `span`, `small`, `label`, any inline element

Small caption, regular weight. 8px, relaxed line-height. Uses `var(--font-family-body)`. Use for badges, minor labels

### `caption-semi-bold-s`

Applies to the components: `span`, `small`, `label`, any inline element

Small caption, semi-bold weight. 8px, relaxed line-height. Uses `var(--font-family-body)`

### `caption-regular-xs`

Applies to the components: `span`, `small`, `label`, any inline element

Extra-small caption, regular weight. Uses `var(--font-family-body)`, relaxed line-height

### `caption-semi-bold-xs`

Applies to the components: `span`, `small`, `label`, any inline element

Extra-small caption, semi-bold weight. Uses `var(--font-family-body)`, relaxed line-height

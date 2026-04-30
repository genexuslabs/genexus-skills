---
name: properties-object-image-entry
description: Configurable image entry properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL

## Description
- Description: Describes the purpose of the image
- Type: `string`

## Is Internal
- Description: Accesible through URL (`false`) or not
- Type: `boolean`

## Style
- Description: Name of a `DesignSystem` object used for styling
- Type: `string`

## Language
- Description: Name of a `Language` object used for localization context
- Type: `string`

## Density
- Description: Screen pixel density for which this image variant is intended
- Type: `enum{Unknown, 75% (ldpi Android, .75x Web), 100% (mdpi Android, 1x iOS, 1x Web), 125% (1.25x Web), 150% (hdpi Android, 1.5x Web), 200% (xhdpi Android, 2x iOS, 2x Web), 300% (xxhdpi Android, 3x iOS, 3x Web), 400% (xxxhdpi Android, 4x Web)}`
- Options:
	* `Unknown`: Compatibility value; HDPI on Android and MDPI on iOS, avoid for new images
	* `75% (ldpi Android, .75x Web)`
	* `100% (mdpi Android, 1x iOS, 1x Web)`
	* `125% (1.25x Web)`
	* `150% (hdpi Android, 1.5x Web)`
	* `200% (xhdpi Android, 2x iOS, 2x Web)`
	* `300% (xxhdpi Android, 3x iOS, 3x Web)`
	* `400% (xxxhdpi Android, 4x Web)`

## Layer
- Description: Visual stacking layer for multi-layer image compositions
- Type: `enum{None,Background,Middle,Foreground}`
- Default: `None`
- Options:
	* `None`: No layer assignment
	* `Background`: Bottom layer
	* `Middle`: Between background and foreground
	* `Foreground`: Top layer

## Rendering Mode
- Description: How image is drawn
- Type: `enum{Automatic,Original,Template}`
- Default: `Original`
- Options:
	* `Automatic`: Context-dependent (Template in toolbars/tabs/buttons, Original elsewhere)
	* `Original`: Draws with original colors
	* `Template`: Renders as a mask tinted by the system

## Flips for Right to Left
- Description: Enables horizontal mirroring in RTL language contexts
- Type: `boolean`

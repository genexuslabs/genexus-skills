# mercury.config (CLI configuration)

`mercury.config` is the configuration file read by the `mercury` CLI when running a build

## MercuryConfig

`MercuryConfig` is `Pick<MercuryOptions, "overrides">` — it only supports the `overrides` field

```ts
type MercuryConfig = {
  overrides?: {
    css?: MercuryCssDefinition;
    tokens?: MercuryTokensDefinition;
  };
};
```

- **overrides.css:** Same format as in the [Vite plugin](vite-plugin-options.md#overrides). Keys are bundle names; values use `{ type: "replace", content: string | function }`
- **overrides.tokens:** Object mapping token names to values

Theme selection (mercury vs globant) is done via CLI arguments (e.g. `--globant`), not via `mercury.config`. See [Themes and variants](../themes-and-variants.md)

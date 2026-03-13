# Mercury Compatibility Table

Use this table when installing or validating a Mercury project to confirm that all packages are on compatible versions. **Always prefer the latest versions** of every package unless there's a specific reason to pin to an older one

> **How to check installed versions:** run `npm ls @genexus/mercury @genexus/chameleon-controls-library @genexus/vite-plugin-mercury @genexus/mercury-cli 2>/dev/null` (adjust for pnpm/yarn)

---

## Mercury (`@genexus/mercury`) ↔ Chameleon (`@genexus/chameleon-controls-library`)

| Mercury version | Compatible Chameleon version  |
| --------------- | ----------------------------- |
| 1.0.0 – latest  | ^6.22.1                       |
| 0.30.0          | 6.20.0 – 6.22.0               |
| 0.23.0 – 0.29.0 | 6.7.0 – 6.19.0                |
| 0.18.0 – 0.22.0 | 6.5.0 – 6.6.0                 |
| 0.16.0 – 0.17.1 | 6.3.0 – 6.4.2                 |
| 0.15.0 – 0.15.1 | 6.2.0 – 6.2.1                 |
| 0.10.0 – 0.14.0 | 6.0.0-next.54 – 6.1.1         |
| ~0.9.15         | 6.0.0-next.52 – 6.0.0-next.53 |

---

## Mercury (`@genexus/mercury`) ↔ Vite Plugin Mercury (`@genexus/vite-plugin-mercury`)

| `@genexus/vite-plugin-mercury` version | Compatible Mercury version |
| -------------------------------------- | -------------------------- |
| 1.2.0 (latest)                         | ^1.0.0                     |
| 0.1.0                                  | 0.36.0                     |

---

## Mercury (`@genexus/mercury`) ↔ Mercury CLI (`@genexus/mercury-cli`)

| `@genexus/mercury-cli` version | Compatible Mercury version |
| ------------------------------ | -------------------------- |
| 0.2.0 (latest)                 | ^1.0.0                     |
| 0.1.1                          | 0.36.0                     |

---

## How to validate after installation

After installing, confirm each installed version falls within the compatible range for your Mercury version:

1. Run the following to see installed versions:
   ```bash
   npm ls @genexus/mercury @genexus/chameleon-controls-library @genexus/vite-plugin-mercury @genexus/mercury-cli 2>/dev/null
   ```
2. Look up the installed Mercury version in the tables above
3. If any package is outside the compatible range, update it to a compatible version — preferably the latest

### Common fixes

| Problem                                          | Fix                                                |
| ------------------------------------------------ | -------------------------------------------------- |
| Mercury 1.x + Chameleon 6.4.x or lower           | `npm i @genexus/chameleon-controls-library@latest` |
| Mercury 1.x + `@genexus/vite-plugin-mercury` 0.x | `npm i -D @genexus/vite-plugin-mercury@latest`     |
| Mercury 1.x + `@genexus/mercury-cli` 0.1.1       | `npm i -D @genexus/mercury-cli@latest`             |

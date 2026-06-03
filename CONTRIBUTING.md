This project uses an issue-driven contribution model with optional pre-issue discussion.

External contributors:
1. Open a new [DISCUSSION](#discussions) or [ISSUE](#issues) describing the problem, proposal, and expected impact.
2. Discuss scope and approach in the issue before implementation.
3. The maintainer/admin team will link and manage the implementation PR internally.
4. Resolution and release status are communicated back in the original issue.

Team members:
1. Create a branch using one of the allowed prefixes, always starting from the `main` branch:
	* `fix/*` for fixing unexpected behaviors running the skill
	* `feature/*` for new capabilities or improvements over the skill
2. Implement changes through [Pull Request (PR)](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) only
	* Follow the [REFERENCES](./README.md#references) standards
	* Comply with [GUIDELINES](#guidelines) in this repository
	* Update [STRUCTURE](./README.md#structure) when adding a new skill
	* Reference the related issue in the PR when it exists
3. Keep code clear, consistent, and easy to review
4. Keep each PR focused, small, and document tradeoffs briefly
5. Assign at least one reviewer and wait for approval before merge

---

## ISSUES
All external contributions must be discussed beforehand through the Issues tab of this repository.
Issues must be written exclusively in **English** to guarantee clarity, consistency, and accessibility for all contributors.

Each report should include a descriptive title and adhere to the following template:

> **Context:**
> Specify the related GeneXus object(s), feature, or skill definition involved (e.g., Transaction, Procedure, Domain, Prompt behavior, modeling rule, etc.). Include relevant version details if applicable.
>
> **Description:**
> Provide a concise and precise explanation of the issue. Clearly state:
> * What is currently happening
> * Why it is incorrect, ambiguous, or incomplete
> * What the expected behavior or definition should be
>   If the issue involves UI, generated code, or graphical inconsistencies, attach relevant screenshots.
>
> **Suggestion:**
> Provide a concrete and technically grounded proposal.
> The suggestion should:
> * Be aligned with GeneXus best practices
> * Preserve consistency with existing skill definitions
> * Include a proposed Markdown structure when relevant
>
> **Additional References (optional):**
> Include links to official GeneXus documentation, related issues, or existing skill files within this repository.

This structure ensures that skill definitions remain technically accurate, modular, and consistent across all GeneXus-related topics defined in this repository.

---

## DISCUSSIONS
Use [Discussions](https://docs.github.com/en/discussions) for early ideation, open questions, and proposal refinement before creating a formal issue.

Use Discussions when:
- Problem framing is still unclear
- Multiple alternatives need comparison
- Feedback is needed before writing an actionable issue

Use Issues when:
- Problem statement is clear and scoped
- A concrete change request can be tracked to implementation

Flow recommendation:
1. Start in Discussions when scope is exploratory
2. Create an Issue when scope is clear
3. Link the related Discussion in the Issue or PR when available

---

## GUIDELINES
Any suggestion (via PR or Issue) that does not follow these rules or adds verbosity without proportional value will be rejected by the team members.

### General
- Write all files in **English** using [Markdown](https://www.markdownguide.org/) with clear section headings
- Name files using **kebab-case** and a structured multi-segment pattern `<category>-<subject>[-<variant>].md`:
  * Use lowercase words separated by hyphens.
  * Avoid cryptic abbreviations or unclear identifiers.
  * Name files following the pattern: category → subject → optional variants.
  * Keep naming consistent across similar files within the repository.
- Prioritize token/character efficiency as a primary objective:
  * Remove trailing whitespace.
  * Omit final periods when a line break already terminates the sentence.
  * Use tabs for indentation (no spaces).
- Explain more with fewer words: maximize signal density, minimize wording.
- Treat concise writing as a quality gate, not a style preference.
- Keep wording clear and unambiguous; avoid typos, grammar mistakes, and vague phrasing.
- Write actionable instructions only:
  * Imperative phrasing
  * Explicit trigger/context
  * Explicit expected outcome
- Keep every change compact:
  * Avoid large rewrites
  * Avoid long narrative text
  * Avoid redundant explanations
- Keep structure compact:
  * Prefer bullets over tables with decorative purpose
  * Reserve tables for compact data or explicit structural needs
- Keep skills modular:
  * Define workflow logic in `SKILL.md`
  * Place detailed or variant-specific material to `references/`
- Keep naming conventions consistent across the repository for skill folders and reference files.
- Keep section structure consistent within each reference family (object-oriented, command-oriented, type-oriented, etc.).
- Keep terminology consistent inside each file and avoid mixing naming styles for the same concept.
- Keep GeneXus syntax examples valid, realistic, and directly executable when copied as a starting point.
- Keep syntax notation consistent;
  * Use `<placeholder>` tags for defining syntax elements
  * Use optional blocks with `[…]` syntax
  * Use ellipsis character (`…`) over three dots (`...`)
  * Use tab indentation and not spaces
- Keep cross-file consistency using standard Markdown syntax `[Label](URL)`
- Reuse shared reference files instead of duplicating instructions.
- Reduce merge risk through additive changes rather than invasive modifications.

### TRADEMARKS
- Review the trademark guidelines published by the trademark owner before using a third-party mark.
- When those guidelines allow it, add the registered mark (®) on the first mention of the term per document — in the description or first paragraph — and omit it in all subsequent mentions.

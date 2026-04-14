# genexus-skills
Repository with AI skills and references for GeneXus-oriented development workflows, providing compact, actionable, and reusable guidance for coding agents.

---

## STRUCTURE
```text
Root
├─ nexa/                     : Nexa skill
│  ├─ references/
│  │  ├─ common-*.md         : shared components over other references
│  │  ├─ global-*.md         : shared global definitions
│  │  ├─ model-*.md          : shared model definitions
│  │  └─ object-*.md         : object-specific specifications
│  └─ SKILL.md               : skill definition and workflow
│
├─ frontend/                 : Frontend skills group
│  ├─ chameleon-controls-library/
│  │  ├─ references/         : 58 web component docs
│  │  └─ SKILL.md
│  ├─ design-system-builder/
│  │  ├─ references/         : DS architecture guides
│  │  └─ SKILL.md
│  ├─ mercury-design-system/
│  │  ├─ references/         : Mercury tokens, bundles, icons
│  │  └─ SKILL.md
│  ├─ ui-creator/
│  │  ├─ references/         : UI generation templates
│  │  └─ SKILL.md
│  └─ README.md              : group description
│
├─ other-skills/             : additional skill groups
│  ├─ skill-a/               : individual skill
│  │  ├─ references/         : references for that skill
│  │  ├─ scripts/            : optional helpers
│  │  ├─ assets/             : optional templates/assets
│  │  └─ SKILL.md            : specific skill definition
│  ├─ skill-b/
│  │  └─ ...
│  └─ README.md              : group description
│
├─ .gitignore                : repository ignore patterns
└─ README.md                 : repository entry point
```

Repository design principles:
- Keep each skill self-contained: `SKILL.md` + optional `references/`, `scripts/`, and `assets/`.
- Use consistent naming to reduce ambiguity and retrieval cost.
- Prefer progressive disclosure; keep `SKILL.md` short and define details in `references/`
- Avoid duplicate guidance across files; keep one source of truth per topic.

---

## REFERENCES
All skill-related contributions must follow these baseline references:
- [Anthropic Claude Code: Overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Anthropic Claude Code: Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [OpenAI Codex: Overview](https://developers.openai.com/codex/)
- [OpenAI Codex CLI: Skills Guide](https://developers.openai.com/codex/skills/)
- [OpenCode: Overview](https://opencode.ai/docs/)
- [OpenCode: Skills](https://opencode.ai/docs/skills/)

---

## ONBOARDING & INSTALLATION
Each platform handles skills with small differences. This repository follows a portable pattern, but always confirm the latest setup in the provider docs listed in [REFERENCES](#references).

### Step 1: Clone once in any local directory
- Choose a local path to clone the repo; for example:
	* macOS/Linux: `~/workspace/genexus-skills`
	* Windows: `%USERPROFILE%\workspace\genexus-skills`
- Clone repository:
	* macOS/Linux
		```bash
		git clone https://github.com/genexuslabs/genexus-skills.git ~/workspace/genexus-skills
		```
	* Windows
		```cmd
		git clone https://github.com/genexuslabs/genexus-skills.git %USERPROFILE%\workspace\genexus-skills
		```

### Step 2: Create symlinks from provider folders to desired skills
- First, identify provider skill paths:
	* **Claude Code**
		- Windows: `%USERPROFILE%\.claude\skills`
		- macOS/Linux: `~/.claude/skills`
	* **Codex (OpenAI)**
		- Windows: `%USERPROFILE%\.codex\skills`
		- macOS/Linux: `~/.codex/skills`
	* **CODA-CLI**
		- Windows: `%USERPROFILE%\.coda\skills`
		- macOS/Linux: `~/.coda/skills`
		- Note: Require version `1.5.0` or higher
	* **OpenCode**
		- Windows: `%USERPROFILE%\.config\opencode\skills`
		- macOS/Linux: `~/.config/opencode/skills`
- Then, create one symlink per skill:
	* macOS/Linux example:
		```bash
		ln -s ~/workspace/genexus-skills/nexa ~/.coda/skills
		```
	* Windows example:
		```cmd
		mklink /J %USERPROFILE%\.coda\skills\nexa %USERPROFILE%\workspace\genexus-skills\nexa
		```
	* ⚠️ Update both the provider skill path and the skill folder name in each command as needed

### Step 3: Validation
- Validate that each provider detects linked skills
	* **Claude Code**
		- Run `claude list-skills`
	* **Codex (OpenAI)**
		- Open interactive session and run `/skills`
	* **CODA-CLI (beta)**
		- Open interactive session and run `/skills`, and then select `List available skills`
	* **OpenCode**
		- Open interactive session and verify skills in `<available_skills>` from the native `skill` tool description
- Confirm skill folder name from Step 1 is displayed the output

### Step 4 (optional): OpenCode + GEAI
Integrate OpenCode with Globant Enterprise AI (GEAI)
- Configuration file:
	* Windows: `%USERPROFILE%\.config\opencode\opencode.json`
	* macOS/Linux: `~/.config/opencode/opencode.json`
	* Content:
		```json
		{
			"$schema": "https://opencode.ai/config.json",
			"provider": {
				"geia": {
					"npm": "@ai-sdk/openai-compatible",
					"name": "Globant Enterprise AI",
					"options": {
						"baseURL": "https://api.saia.ai"
					},
					"models": {
						"anthropic/claude-opus-4-6": {
							"name": "GEIA Claude Opus 4.6"
						},
						"anthropic/claude-sonnet-4-6": {
							"name": "GEIA Claude Sonnet 4.6"
						},
						"anthropic/claude-haiku-4-5": {
							"name": "GEIA Claude Haiku 4.5"
						},
						"openai/gpt-5.2-codex": {
							"name": "GEIA GPT 5.2 Codex"
						},
						"xai/grok-code-fast-1": {
							"name": "GEIA Grok Code Fast"
						}
					}
				}
			},
			"model": "anthropic/claude-haiku-4-5"
		}
		```
- Credentials file:
	* Windows: `%USERPROFILE%\.local\share\opencode\auth.json`
	* macOS/Linux: `~/.local/share/opencode/auth.json`
	* Content:
		```json
		{
			"geia": {
				"type": "api",
				"key": "<your-api-key>"
			}
		}
		```

### Step 5: Run the skill from any CLI provider
After linking and validating the skill, open the coding CLI you set up and start a session in your project folder.

Once you open your CLI, start typing your skill-related request:
<pre>
╔═════════════════════════════════════════╗
║ ○                                     ○ ║
║        YOUR CODING-CLI INTERFACE        ║
║ ○                                     ○ ║
╚═════════════════════════════════════════╝
 
> %type-your-request-here%
</pre>

Examples that trigger `nexa` skill:
- _Create a Transaction object for Product with ProductId, ProductName, ProductPrice_
- _Review the AddCart procedure and apply GeneXus best practices_
- _Generate a Data Provider from Customer but based in SDT and add output example_

---

## CONTRIBUTION
Refer to [CONTRIBUTING](./CONTRIBUTING.md).

---

## EXTENSIBILITY
This project is intentionally extensible through [Forks](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-forks).

Fork policy:
- You may fork and extend the repository freely.
- Fork owners are responsible for keeping their fork aligned with upstream updates.
- Upstream sync should be frequent to reduce merge complexity and drift.

Extensibility best practices:
- Prefer additive changes (new sibling references, new skill folders) over invasive rewrites.
- Extend existing sections only when semantics are truly shared.
- Isolate variant-specific guidance in separate files to minimize merge conflicts.
- Preserve compatibility in naming and structure so changes remain easy to rebase.

---

# LICENCE
```
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

---
name: properties-object-agent
description: Configurable agent properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL
Include [General](./properties-common.md) properties

## Main program
- Description: Marks the object as executable (standalone)
- Type: `boolean`
- Default: `False`

## AI Model
- Description: Agent model name; check [Supported Chat Models](https://docs.globant.ai/en/wiki?200,Supported+Chat+Models)
- Type: `string`
- Default: `openai/gpt-4.1`

---

# LLM CONFIGURATION

## Creativity Level (temperature)
- Description: Controls predictability; higher values introduce randomness/diversity
- Type: `number`
- Default: `0.5`

## Max Tokens
- Description: Controls max tokens in reponse; higher values allow more detailed answers
- Type: `integer`
- Default: `5000`

---

# WORKFLOW

## Callable from workflow
- Description: Allows agent to be called from [BPD node](./object-business-process.md)
- Type: `boolean`
- Default: `False`
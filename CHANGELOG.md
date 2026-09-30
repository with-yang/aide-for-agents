# Changelog

Each version has notes for the user and, when needed, notes for the assistant that performs the update (see `template/system/update.md`). Newest first.

## 0.1.0 — 2026-09-30

For you:
- Aide can now update itself: the daily brief tells you when a new version is out, and one click updates it.
- The daily brief shows up as a card with buttons, where your app supports it.
- Your assistant keeps goals, todos, one-off events and people in order, and merges duplicates on its own.
- It also asks about your notes (Notion, Obsidian, …) to get to know you better.

For the assistant:
- The product folder was renamed from `.aide/` to `system/`, and `.state.json` to `state.json`. If `.aide/` still exists after the update, remove it. If `.state.json` exists, rename it to `state.json` (keep its contents).
- Add `"source": "https://github.com/with-yang/aide-for-agents"` to `state.json` if it's missing.
- Find this home's daily brief task: `routines.md` names the host and task id. If you can see that host's scheduled tasks, read that task's prompt. If it mentions `.aide/`, tell the user it needs to be recreated with the prompt in `system/onboarding.md` (step 5), and offer to do it. If you can't see it, ask the user to check.
- If `me/rules.md` doesn't exist, create it with just a heading in the user's language (meaning "My rules").

## 0.0.1 — 2026-09-29

First release.

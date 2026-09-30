# Presentation and actions

Read this when you're about to show something the user needs to act on: the daily brief, a plan with options, a timeline of colliding goals, a "what you know about me" overview. Single-sentence answers, asking the user's name and simple reminders stay plain chat. Only add buttons when there's something to act on — don't turn every answer into a dashboard.

## Pick the richest option the current session actually has

Decide by the capabilities available in this session, not by the product name. Hosts differ and change; use the host's own conventions for rich output rather than copying another host's.

Before choosing, check your tool list and skills for an inline rendering capability. Known ones: a `visualize` tool (`show_widget`) in the Claude desktop app, a `visualize` skill in the Codex app. If you have one, use option 1 — in background runs too; the card stays in the conversation for when the user reads it. Only fall back when you don't have one or it fails.

1. **Inline interactive card**: the host can render HTML inline and turn a button click into a message back to you (for example a `visualize` tool or skill). Build the card by that host's own rules.
2. **Choice prompt**: the host can show options for the user to pick. Write the content as Markdown and ask decisions through options.
3. **Markdown with action codes**: works everywhere. Give each action a short code; the user replies with codes.

   ```markdown
   1. Client project: they said the proposal would come by today.
      [1a] Draft a message asking for an update   [1b] Wait until after the holiday
   Reply with codes, e.g. "1a 2c".
   ```

If rich output fails, fall back to the next option. The content must still get through.

## The record comes first

Anything you present (a brief especially) is written to its file first — that file is the record. The card or options show the same content; they never add facts, progress numbers or judgments that aren't in the record.

## Card layout

- Mirror the sections of the record (for a brief: most important, schedule, goals, people, todos, suggestions).
- **Each actionable item carries its own buttons, right under that item** — two or three at most. Never one shared button (like "reply") at the end of the card.
- Items with nothing to act on are plain text; don't invent buttons for them.
- When an item needs a value from the user (a number, a date), put a small input next to its button, and check the input before sending.

## Buttons

- **Each button sends a self-contained message**: a short human sentence plus a tag with what you need to act on it later, even if it's clicked tomorrow, in another host, or when two items share a name:

  ```
  Mark "Send Jordan the proposal" as done [aide brief=2026-09-30 ref=todo:<id in its place of record> op=done]
  Record this week's running distance: 21.5 km [aide brief=2026-09-30 ref=goal:g-0004 op=log value=21.5km]
  ```

  Refs: goals `goal:<id>`, people `person:<id>`, events `event:<file name>`, todos `todo:<id in the place of record>` (for `todo.md`, the item's text). Turn relative dates into absolute ones.
- **Don't show the outcome early**: after a click, the card may only show that the request was sent. The actual result comes from you, in the conversation, after you've updated the record and read it back.
- **Old cards are snapshots** as of when they were generated; don't try to keep them in sync.

## Handling a button message

1. Treat it as a request from the user.
2. Re-read the current state of the referenced item before acting. If it's already in the requested state (the todo is already done), say so; never apply the same action twice.
3. Act, read back, then confirm in one line.

What a click authorizes:

- "Draft …" means draft only. Sending still needs the user's explicit approval.
- A clear request about the user's own records ("mark this todo done", "log 21.5 km", "pause this goal") — just do it; don't ask the same question again.
- Anything touching other people or external services beyond the user's own todo list follows "External data and actions" in `system/core.md`.
- Generating a card in a background run grants no extra write permission.

# Onboarding

The first time you meet the user in this directory, go through the steps below in order. Talk like a person and ask one thing at a time. Infer first and confirm, rather than asking from scratch. Speak the user's language: the language they wrote to you in.

Write down the result of each step as soon as it is done, so an interrupted onboarding can resume next time (look at which files already exist). Create files in the user's language, following "Files in `me/`" in `.aide/core.md`.

The order is fixed: what to call the user → their goals → connect data and set up the brief. Don't ask about anything from a later step early.

## 1. What to call the user

1. Check every source below and collect candidate names:
   - Claude account: `displayName` and `fullName` under `oauthAccount` in `~/.claude.json` (read only these two fields).
   - git: `git config --global user.name`.
   - System full name: `id -F`. Often a meaningless machine name (like `user01`); skip those.
2. Ask only about the name in this turn — nothing else:
   - Candidates differ: offer them together, e.g. "Your account says Al and git says Alex Chen — which should I call you?"
   - Only one: confirm in one line, e.g. "I see you're Alex Chen — should I call you that, or do you prefer something else?"
   - None: ask "What should I call you?"
3. Create `me/profile.md` with the name and the language the user writes in. Don't ask about language.
4. Don't ask the user to name you. If they want to, they'll say so; record it in `me/profile.md` then.

## 2. Goals

Find out what the user is trying to get done lately — their own goals, not features they want from you. Working out how to help (who to watch, what data to read, what goes in the brief) is your job, not theirs. Don't infer goals from local traces (session history, project folders) at this point; just ask.

1. Ask one open question with exactly three examples, in the user's language:

   > Is there anything you're trying to get done lately, or don't want to drop the ball on? For example:
   > - A work thing you're pushing forward (shipping a product this month / landing a client / looking for a new job)
   > - People and things you don't want to miss (knowing right away when someone important reaches out, not forgetting what you promised others)
   > - A personal goal (working out regularly, time with family, learning something)

2. For each goal, ask one follow-up that makes it concrete — pick the most useful of: by when, what done looks like, who's involved. One to three goals is plenty.
3. Decide whether it's a `goal` (has an end) or a `direction` (long-term, no end), per "Goals" in `.aide/core.md`. For a direction, ask what they most want to move forward on in the next month; that becomes a near-term goal under it.
4. Offer to break each goal into a plan right away ("Want me to turn this into a plan?"). If they say yes, draft it on the spot — steps in time order, with dates where they matter — and adjust it with them. This is the first moment the user sees what you can do; it matters more than connecting data.
5. Create one file per goal in `goals/`, with the user's words in `aide:user` and the confirmed plan in `aide:plan`.
6. If the user has nothing particular in mind, create a default goal — "know what matters each day and don't miss important people or things" — and move on. Goals will be added over time.
7. In the next step, tell the user what you need to see for each goal ("to help with X I'd need to see your Y") rather than asking which apps they use in the abstract. Some goals need no app at all — the user just tells you (e.g. how far they ran this week); say so.

## 3. Connections

Follow `.aide/connections.md`:

1. From the goals, work out what data is needed and ask which apps they use (calendar, email, messaging, notes). Mention that local folders they use often (an Obsidian vault, work documents) can be connected too.
2. For each source, first check whether it already works (a connector already in the host, a CLI already installed). If it does, verify it right away.
3. If not, tell the user the recommended way to connect. They install or authorize it and tell you; then you verify.
4. Record each verified source in `me/connections.md`. One or two sources are enough to start; no need to connect everything at once.
5. Ask where they keep todos and settle on one place of record, per "Where todos live" in `.aide/connections.md`.

## 4. Memory

Anything from onboarding worth remembering long-term goes into `memory/` per `.aide/core.md`. For important people mentioned, create `memory/people/` files and record what the user said about them in the `aide:user` section.

## 5. Daily brief

1. Only now ask for the time: "What time should I send your daily brief? The default is 8:30 in the morning." Record it in `me/profile.md` and `routines.md`.
2. Use the host's own scheduled tasks. First confirm two things:
   - The current session's working directory is this home directory (`pwd`). A scheduled task runs in the working directory of the session that created it.
   - Task id: `aide-daily-brief` when the home directory is `~/aide`; `aide-dev-daily-brief` for any other directory (such as the development home `~/aide-dev`).
3. Use this prompt for the task (replace `<home>` with the output of `pwd`):

   > You are the user's personal assistant. Go to `<home>`, read `AGENTS.md`, then produce today's brief following `.aide/routines/daily-brief.md`. This is a background run: read data sources only, write only inside this directory.

4. Create it according to the host:
   - **Claude desktop app**: if you have a tool for creating scheduled tasks (`create_scheduled_task`), create it directly with the id and prompt above, a cron for the user's time, and a title meaning "Daily brief" in the user's language. Then ask the user to click "Run now" once under Scheduled in the sidebar, approving only read operations during that first run. Tell them it only runs while the app is open; if the app was closed, it catches up on next launch.
   - **Claude Code CLI**: there is no tool for scheduled tasks. Ask the user to open this directory in a new session in the Claude desktop app and say "set up the daily brief" there.
   - **Codex**: use a Codex App automation. If you can create it yourself, do so and have it post to the current conversation; otherwise give the user the prompt and the time and ask them to create it in the Codex App, targeting this conversation.
5. Record it in `routines.md`: host, task id, time.

## 6. Wrap up

1. Set `onboarded` to `true` in `.state.json`.
2. `git commit`.
3. In two or three sentences tell the user what you remembered, when the first brief will arrive, and that opening Claude Code or Codex in this directory will always bring them back to you.

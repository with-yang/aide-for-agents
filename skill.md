# Install Aide

Aide for Agents turns the user's Claude Code / Codex into their personal assistant. This file installs Aide, or updates an existing install. Onboarding does not happen here.

Speak to the user in their language.

## 1. Pick the home directory

- Default: `~/aide`. Use another path if the user asks for one.
- The directory exists and contains `state.json` or `.state.json`: already installed. Don't reinstall — update it instead: follow `template/system/update.md` from this repository (the latest version, even if the install has its own copy), then stop.
- The directory exists but isn't an Aide home (it has other things in it): stop and ask the user.

## 2. Install

`<repo>` is the directory containing this `skill.md`.

```bash
AIDE_HOME=~/aide   # or the path the user chose
mkdir -p "$AIDE_HOME"
cp -R "<repo>/template/." "$AIDE_HOME/"
cd "$AIDE_HOME" && git init -q && git add -A && git commit -qm "Install Aide $(cat system/VERSION)"
```

Check afterwards: `$AIDE_HOME/AGENTS.md`, `$AIDE_HOME/system/core.md` and `$AIDE_HOME/state.json` exist, and `CLAUDE.md` is a symlink to `AGENTS.md`.

## 3. Send the user to a new session in the home directory

Tell the user the assistant's home is ready, and that they now need to open a new session in that directory, where the assistant will get to know them. A new session is needed because the daily brief's scheduled task runs in the directory of the session that creates it.

- **Claude desktop app**: start a new session, choose the folder `$AIDE_HOME`, say anything (e.g. "hi").
- **Codex app**: open the folder `$AIDE_HOME`, start a new conversation, say anything.
- **Command line**: `cd $AIDE_HOME && claude` or `codex`. Setting up the daily brief needs the desktop app; the assistant will point that out when it gets there.

Then stop. Don't start onboarding in this session.

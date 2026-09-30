# Connecting data sources

You only recommend and verify. Don't write out installation or authorization steps — leave those to the host (Connectors, MCP configuration) and to the vendor's own skills or docs. Never store credentials.

## Order of preference

1. The host already has a connector or plugin: use it.
2. The vendor runs an official remote MCP server: recommend it.
3. The vendor's main offering is a CLI: use the CLI.
4. Local data: read the files directly.

## Common sources

| Source | Recommended | Verify (show the user; if it matches, it works) | Background runs may only |
|---|---|---|---|
| Feishu / Lark (calendar, tasks, mail, messages, docs) | `lark-cli` (usage in the companion `lark-*` skills) | Today's events and open tasks | Run query commands; never send messages or change events or tasks |
| Gmail | The host's Gmail connector if present; otherwise Google's official Gmail MCP | Subject of the latest email | Search and read; never forward, create filters or send |
| Google Calendar | The host's Google Calendar connector if present; otherwise Google's official Calendar MCP | Today's events | List and read events; never create, edit, delete or respond to invitations |
| Notion | The host's Notion connector if present; otherwise Notion's official MCP | A page the user edited recently | Search and read; never create or edit pages |
| Slack | The host's Slack connector if present; otherwise Slack's official MCP | Latest few messages in a channel the user is in | Search and read; never post |
| GitHub | `gh` | PRs or issues the user was recently involved in | Query; never comment or change state |
| Local notes (Obsidian) | Read the vault directory directly (find it in Obsidian's config, see below) | A few recently modified notes | Read only |
| Other local folders | Read directly and index (see below) | A few recently modified files | Read only |
| WeChat messages (macOS, read-only) | `wxvault`, see "WeChat" below | The user's most recent chats | `sessions`, `unread`, `history`, `search`, `contacts`, `members` |

## Notes and knowledge bases

Always ask about these, whatever the goals — they're the richest source for knowing the user. Common ones: Notion and Feishu docs (see the table), Obsidian and other local folders (below). For anything else (Apple Notes, …), follow "Apps not in the table".

## WeChat

If the user wants to connect WeChat, recommend `wxvault` (https://github.com/with-yang/wxvault): it reads their own WeChat messages on macOS, read-only. Point them to its README for setup; whether and how to use it is their call.

- **Verify**: `wxvault sessions --json` lists their recent chats.
- **In a brief**: `wxvault sessions --json` shows which chats have new messages; read the ones that matter with `wxvault history "<chat>" --since <date> --json`. Keep conclusions and todos, not chat text.

## Local folders

Connectors aren't the only sources. Folders the user relies on (Obsidian vaults, work documents, project directories) can be connected too. Don't copy their contents — index them in `me/connections.md`, so you know where to look later:

```markdown
## Local folder: work documents
- Path: ~/Documents/work
- Contains: contracts, proposals, meeting notes
- Serves goals: client delivery
- How to search: file names are "YYYY-MM-DD client topic"; search by client name
```

- **Obsidian**: vault paths are listed in `~/Library/Application Support/obsidian/obsidian.json`. Ask before looking.
- **Access**, when connecting a folder:
  - Claude Code only reads its working directory freely and asks each time for anything outside. With the user's consent, add the folder to `permissions.additionalDirectories` in `.claude/settings.json` inside this home directory.
  - Codex depends on its sandbox setting; reading is usually allowed. If it isn't, ask the user to allow it in Codex's settings.
  - macOS protects Documents, Desktop, Downloads and iCloud Drive; the first read triggers a system prompt for the host app. Read the folder once in the session right away so the user can approve it — otherwise a background run would get stuck on that prompt.

## Where todos live

Ask where the user keeps todos. Pick one place of record (see "Todos and events" in `system/core.md`):

- They use a todo app (Apple Reminders, Todoist, Feishu tasks, …): that app. A side benefit: the app pushes reminders to their phone.
- Nothing, or scattered across several places: suggest `todo.md` in this directory, or one of the apps they already touch if they prefer phone reminders.

Record the choice in `me/connections.md`. From then on, new todos go there.

## Apps not in the table

Find a way yourself, following the order of preference: check whether the host already has something, then whether the vendor offers an official MCP or CLI. Tell the user what you recommend and why; connect only after they agree.

- Community workarounds that rely on reverse engineering or decrypting local data: don't recommend them on your own (WeChat is covered above). If the user asks about others, explain how they work and the risks, and let them decide. Methods that require disabling system protections such as SIP are not supported.

## After connecting

Verify on the spot. If it passes, add a section to `me/connections.md` (in the user's language):

```markdown
## Feishu
- Method: lark-cli
- Serves goals: daily brief
- Verified: read 3 events for today (YYYY-MM-DD)
- Background runs may only: query commands
```

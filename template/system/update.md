# Updating Aide

Run this when the user asks to update Aide or clicks an update button. Only in a conversation with the user — never in a background run: an update changes how you behave.

The product owns `system/`, `AGENTS.md` and `CLAUDE.md`. An update replaces exactly those. Everything else belongs to the user and is only ever migrated, never overwritten.

1. **Development install?** If `system` is a symlink, this home tracks a local copy of the repository directly. Say so and stop.
2. **Get the latest version** from `source` in `state.json` (if it's missing, use `https://github.com/with-yang/aide-for-agents`):

   ```bash
   tmp=$(mktemp -d) && git clone -q --depth 1 "<source>" "$tmp"
   ```

3. **Compare** `system/VERSION` (in an install from before 0.1.0: `.aide/VERSION`) with `$tmp/template/system/VERSION`. Same version: tell the user they're up to date, remove `$tmp`, stop.
4. **Checkpoint**: `git add -A && git commit -m "<message>"` with a message in the user's language meaning "Before updating Aide to <new version>" (skip if there's nothing to commit). Always write the full version, e.g. `0.1.0`.
5. **Replace the product files**:

   ```bash
   rm -rf system && cp -R "$tmp/template/system" system
   cp "$tmp/template/AGENTS.md" AGENTS.md && ln -sf AGENTS.md CLAUDE.md
   ```

6. **Migrate**: in `$tmp/CHANGELOG.md`, read every entry newer than the old version, oldest first, and carry out its "For the assistant" notes. Migrations only add, rename or move; they never drop the user's content. Anything you create for the user (a file, a heading) is in the user's language. If an entry changes `schema`, set it in `state.json`.
7. **Commit** with a message in the user's language meaning "Update Aide to <new version>" (full version), then `rm -rf "$tmp"`.
8. **Tell the user** in two or three lines what changed for them, from the "For you" notes.

If anything fails midway, restore the product files from the checkpoint (`git checkout <checkpoint> -- system AGENTS.md CLAUDE.md`), tell the user what went wrong, and leave the rest untouched.

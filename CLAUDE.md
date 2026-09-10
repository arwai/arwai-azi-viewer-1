# Antigravity Agent Directives

## Workspace Restraints
- DO NOT execute recursive grep or repository sweeps (`find`, `grep`, `ls -R`).
- Your primary source of truth for the codebase structure is the local `graph.json` file. Read this map first.
- Strictly limit file operations to the specific target modules identified by the Graphify index.
- Do not run continuous execution or multi-file writing loops without user approval.

## Model Hand-off
- Use the local `graph.reports` file to trace paths between dependencies before writing any refactoring plans.

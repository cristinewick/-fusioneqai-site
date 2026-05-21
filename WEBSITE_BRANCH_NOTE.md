# FusionEQ Website Branch Note

Live website deploys should be made from:

`main`

The `codex-guided-intelligence-concept` branch was used for drafting and review, but the live site is currently deploying from `main`.

Before committing website edits, confirm:

```bash
git status --short --branch
```

Before pushing live website edits, confirm the active branch is `main`.

This repo also has a local branch guard in `.githooks/`:

- Website-file commits are blocked when the active branch is not `main`.
- Pushes to `main` are blocked unless the active branch is `main`.

Intentional experiment branches can still be used, but final live website work should return to `main` before commit and push.

@AGENTS.md

## Git

- AI assistants may commit, create branches, push those branches, and open pull requests without asking first.
- **Never push to, commit directly on, force-push, or merge into `main`.** Every change reaches `main` only through a PR that the user merges.
- Before pushing, run `npm run lint` and `npm run build` and make sure both pass.

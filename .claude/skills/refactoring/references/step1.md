# Step 1: Structure Refactoring Based on .ai.md

## Project Path

{PROJECT_PATH}

## Your Task

### 0. Read Architecture Rules (DO FIRST)

Read these files to understand the architecture:

- `src/api/.ai.md`
- `src/state/.ai.md`
- `src/page/.ai.md`

Data flow: `page → state → api`

### 1. Identify Domains

List all domains in the project (e.g., user, product, order)

### 2. Check Already Staged Files

```bash
git diff --cached --name-only
```

**IMPORTANT**: Skip files already staged. Focus only on unstaged files.

### 3. Parallel Investigation (3 Subagents)

Run 3 agents in parallel to find violations:

**Agent 1: API Violations**

- Missing `src/api/{domain}/` structure (must have types.ts, index.ts, actions/)
- Route handlers in `src/app/api/**` (must convert to server actions)
- Exception: `src/app/api/auth/**` is allowed

**Agent 2: State Violations**

- Missing `src/state/{domain}/` structure (must have types.ts, store.ts, index.ts)
- Auth checks in UI components (must use DI pattern in actions, read: /src/state/.ai.md)
- Auth state outside `state/user/` (must be centralized)

**Agent 3: Page Violations**

- Missing `src/page/{route}/` structure
- Hardcoded data in components (must move to `api/_mock/`)
- Direct api imports in pages (must go through state layer)

Merge violation lists from all agents.

### 4. Fix Violations (Unstaged Files Only)

For each violation found, fix according to .ai.md rules.

**Rules:**

- Mock first: APIs without schema use `src/api/_mock/`
- Keep existing real API integrations unchanged
- Image upload uses R2 integration (if needed, trigger `upload-image` skill)
- Server actions can receive files directly: `file: File | File[]`

### 5. Validate

```bash
pnpm run validate
```

Fix any errors before proceeding.

### 6. Stage Changes

```bash
git add .
```

### 7. Loop Check

If violations remain → go back to step 2
If no violations → proceed to report

### 8. Report (REQUIRED)

You MUST report:

1. **Newly staged file count** (files YOU staged in this iteration)
2. Files fixed in this iteration
3. Any remaining violations found

Example:

```
NEWLY STAGED FILES: 7
Fixed: src/api/user/types.ts, src/api/user/index.ts, ...
Remaining: src/state/product needs refactoring
```

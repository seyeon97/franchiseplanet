---
name: auth-setup
description: Better-auth setup. Triggers - "인증 설정", "로그인", "회원가입". Requires db-setup first.
---

## Workflow

- [ ] `bash -c '.claude/skills/auth-setup/scripts/setup.sh'`
- [ ] `src/api/user/actions/get-me.ts`: implement with getServerSession() + member table → see TODO
- [ ] `src/state/user/actions/auth.ts`: implement signIn/signUp/signOut → see TODO
- [ ] Add to `## Project Structure & Architecture` section in CLAUDE.md:
  ```
  server/auth/ - Better-auth configuration
    - src/server/auth/index.ts: getServerSession() for server-side session fetch
    - src/lib/auth-client.ts: client-side auth hooks (signIn, signUp, signOut)
  ```
- [ ] `rm -rf .claude/skills/auth-setup`

(Reference - no changes needed)
- `src/page/layout/root-layout/client.tsx`: StateProvider + UserInit already configured

## Member Table ID Sync

When user signs up, member table row should use same ID as auth user:
- On signUp: create member row with `id = session.user.id`
- On getMe: query member table using `session.user.id`

This ensures 1:1 mapping between auth user and member profile.

## Output Files

```
src/server/auth/index.ts       # Better-auth server config
src/server/db/plugin/auth/schema.ts  # Auth tables (user, session)
src/lib/auth-client.ts         # Client hooks
src/app/api/auth/[...all]/route.ts   # Auth API endpoint
```

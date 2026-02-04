---
name: db-setup
description: D1 database setup with Drizzle ORM. Triggers - "DB 연동", "데이터베이스 설정", "D1 추가", or when DB needed.
---

## Workflow

- [ ] `bash -c '.claude/skills/db-setup/scripts/setup.sh'`
- [ ] Add to `## Project Structure & Architecture` section in CLAUDE.md:
  ```
  server/db/ - D1 database with Drizzle ORM
    - getDb(): returns DB instance
    - schema.ts: table schema definitions
  ```
- [ ] Add to `## Critical Rules` section in CLAUDE.md:
  ```
  **🚨 DB SCHEMA RULE:**
  - **When modifying schema, ALWAYS run these commands in sequence:**
    ```bash
    pnpm drizzle-kit generate  # Generate migration files
    pnpm drizzle-kit migrate   # Apply migrations to DB
    ```
  - **NEVER directly add/remove columns in the database**
  - All schema changes must go through Drizzle ORM migrations
  ```
- [ ] `rm -rf .claude/skills/db-setup`

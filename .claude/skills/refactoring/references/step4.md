# Step 4: Real API Implementation (Selected Domains Only)

## Project Path
{PROJECT_PATH}

## Selected Domains
{SELECTED_DOMAINS}

**Only implement real API for these domains. Skip others.**

## Prerequisites

Check and invoke skills if needed:
- Auth needed but not set up → `auth-setup` skill
- Image upload needed → `upload-image` skill (R2)
- Image generation needed → `image-generation` skill
- DB needed but not set up → `db-setup` skill

## Your Task

### 1. Replace Mock with Real DB (Selected Domains Only)

For each API in `src/api/{domain}/actions/` where domain is in {SELECTED_DOMAINS}:
- Replace mock data imports with real DB queries
- Follow patterns in `.ai.md` files

**Skip domains NOT in {SELECTED_DOMAINS}.**

### 2. Auth Integration

- Use `getServerSession()` to get user ID in server actions
- Verify `state/user` and `root-layout` integration

### 3. Move Mock to Legacy (Selected Domains Only)

**이동 후 타입 체크로 미연동 부분 식별:**

For each domain in {SELECTED_DOMAINS}:
```bash
# 1. _legacy_mock 폴더로 이동
mkdir -p src/api/_legacy_mock
mv src/api/_mock/{domain} src/api/_legacy_mock/{domain}

# 2. _mock 폴더가 비었으면 삭제
[ -z "$(ls -A src/api/_mock 2>/dev/null)" ] && rm -rf src/api/_mock
```

### 4. Validate & Find Unconnected Parts

```bash
pnpm run validate
```

**타입 에러가 발생하면:**
- 에러 메시지에서 `_mock` import를 찾아가는 파일 확인
- 해당 파일이 아직 실제 API로 연동 안 된 부분
- 순차적으로 연동 작업 진행

**모든 타입 에러 해결 후:**
- Report: 연동 완료된 API 목록
- `_legacy_mock`은 참고용으로 보존 (나중에 삭제 가능)

Report:
- Selected domains processed: {SELECTED_DOMAINS}
- APIs implemented for which domains
- Mocks moved to _legacy_mock for which domains
- Remaining mocks (if any)
- Any issues

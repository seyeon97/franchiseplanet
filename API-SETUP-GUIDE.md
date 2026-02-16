# 🚀 AI API 설정 가이드

끊김 없는 AI 챗봇을 위한 무료 API 키 발급 및 설정 방법입니다.

---

## 📋 목차
1. [전략 설명](#전략-설명)
2. [추천 API 목록](#추천-api-목록)
3. [API 키 발급 방법](#api-키-발급-방법)
4. [설정 방법](#설정-방법)
5. [FAQ](#faq)

---

## 💡 전략 설명

**왜 여러 개의 API를 설정해야 하나요?**

무료 AI API들은 할당량 제한이 있습니다:
- Google Gemini: 하루 1,500회
- Groq: 분당 30회
- DeepSeek: 매우 관대

**해결책: 여러 계정으로 발급받기!**

예시:
- Gemini 키 3개 = 하루 4,500회
- Groq 키 2개 = 할당량 2배
- DeepSeek 키 1개 = 백업

시스템이 자동으로:
1. 첫 번째 API 시도
2. 할당량 초과 시 두 번째 API로 자동 전환
3. 모든 API를 순차적으로 시도

→ **끊김 없는 대화 보장!**

---

## 🎯 추천 API 목록

### 1위: Google Gemini (가장 추천) ⭐⭐⭐⭐⭐
- **할당량**: 하루 1,500회 (RPM 15)
- **속도**: 빠름
- **품질**: 매우 좋음
- **비용**: 완전 무료
- **추천**: 3개 계정 발급 (총 4,500회/일)

### 2위: Groq ⭐⭐⭐⭐
- **할당량**: 분당 30회, 하루 14,400회
- **속도**: 매우 빠름
- **품질**: 좋음
- **비용**: 완전 무료
- **추천**: 2개 계정 발급

### 3위: DeepSeek ⭐⭐⭐⭐
- **할당량**: 매우 관대
- **속도**: 보통
- **품질**: 좋음
- **비용**: 거의 무료 (1M 토큰당 $0.14)
- **추천**: 백업용 1개

---

## 🔑 API 키 발급 방법

### 1. Google Gemini (5분 소요)

**필요한 것**: Gmail 계정 (여러 개 권장)

**발급 절차**:
1. https://makersuite.google.com/app/apikey 방문
2. Google 계정 로그인
3. **"Create API Key"** 클릭
4. 생성된 키 복사 (AIza로 시작)

**여러 개 발급하기**:
- 다른 Gmail 계정으로 로그인
- 위 과정 반복
- 각 계정마다 하루 1,500회씩 사용 가능!

**주의사항**:
- API 키는 절대 공유하지 마세요
- GitHub에 업로드하지 마세요

---

### 2. Groq (3분 소요)

**필요한 것**: 이메일 계정

**발급 절차**:
1. https://console.groq.com 방문
2. 회원가입 (이메일 인증)
3. **"API Keys"** 메뉴 클릭
4. **"Create API Key"** 클릭
5. 생성된 키 복사 (gsk_로 시작)

**여러 개 발급하기**:
- 다른 이메일로 계정 생성
- 위 과정 반복

---

### 3. DeepSeek (3분 소요)

**필요한 것**: 이메일 계정

**발급 절차**:
1. https://platform.deepseek.com 방문
2. 회원가입
3. **"API Keys"** 메뉴 클릭
4. **"Create API Key"** 클릭
5. 생성된 키 복사 (sk-로 시작)

**주의사항**:
- 무료 크레딧 제공
- 사용량 모니터링 가능

---

## ⚙️ 설정 방법

### 1단계: config.ts 파일 열기

파일 위치: `/home/user/my-app/src/server/config.ts`

### 2단계: API 키 입력

발급받은 키를 해당 위치에 입력하세요:

```typescript
AI_APIS: [
  // === Gemini (3개 권장) ===
  {
    name: "Gemini-1",
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
    key: "AIzaSyABC123...",  // ← 여기에 첫 번째 Gemini 키
    model: "gemini-2.0-flash-exp",
  },
  {
    name: "Gemini-2",
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
    key: "AIzaSyDEF456...",  // ← 여기에 두 번째 Gemini 키 (선택)
    model: "gemini-2.0-flash-exp",
  },
  {
    name: "Gemini-3",
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
    key: "AIzaSyGHI789...",  // ← 여기에 세 번째 Gemini 키 (선택)
    model: "gemini-2.0-flash-exp",
  },

  // === Groq (2개 권장) ===
  {
    name: "Groq-1",
    url: "https://api.groq.com/openai/v1/chat/completions",
    key: "gsk_ABC123...",  // ← 여기에 첫 번째 Groq 키
    model: "llama-3.3-70b-versatile",
  },
  {
    name: "Groq-2",
    url: "https://api.groq.com/openai/v1/chat/completions",
    key: "gsk_DEF456...",  // ← 여기에 두 번째 Groq 키 (선택)
    model: "llama-3.3-70b-versatile",
  },

  // === DeepSeek (백업용) ===
  {
    name: "DeepSeek-1",
    url: "https://api.deepseek.com/v1/chat/completions",
    key: "sk-ABC123...",  // ← 여기에 DeepSeek 키
    model: "deepseek-chat",
  },
],
```

### 3단계: 불필요한 API 제거 (선택)

키를 발급받지 않은 API는 삭제하거나 주석 처리하세요:

```typescript
// 이 API는 사용하지 않으므로 주석 처리
// {
//   name: "Gemini-3",
//   url: "...",
//   key: "YOUR_GEMINI_KEY_3",
//   model: "...",
// },
```

### 4단계: 서버 재시작

```bash
# 개발 서버 중지
.tools/kill-port.sh 3000

# 개발 서버 시작
.tools/start-dev-server.sh 3000
```

---

## ✅ 작동 확인

1. `/consulting` 페이지 접속
2. "메가커피 창업" 같은 질문 입력
3. AI가 자연스럽게 답변하는지 확인

**로그 확인**:
```bash
.tools/show-dev-logs.sh 20
```

성공 시 로그:
```
[AI Chat] Gemini-1 API 시도 중...
[AI Chat] Gemini-1 API 성공
```

할당량 초과 시 자동 전환:
```
[AI Chat] Gemini-1 API 시도 중...
[AI Chat] Gemini-1 API 실패: 429 Quota exceeded
[AI Chat] Gemini-2 API 시도 중...
[AI Chat] Gemini-2 API 성공
```

---

## ❓ FAQ

### Q1: 몇 개의 API 키를 발급받아야 하나요?

**최소 권장**: Gemini 1개
**권장**: Gemini 3개 + Groq 2개
**이상적**: 위 + DeepSeek 1개

### Q2: 비용이 얼마나 드나요?

- **Gemini**: 완전 무료
- **Groq**: 완전 무료
- **DeepSeek**: 무료 크레딧 제공, 이후 거의 무료 (1M 토큰당 $0.14)

대부분의 사용량은 무료 범위 내에서 해결됩니다.

### Q3: 할당량이 모두 소진되면?

시스템이 자동으로 다음 API로 전환합니다. 모든 API가 소진되면 친절한 안내 메시지가 표시됩니다.

### Q4: API 키가 노출되면 어떻게 하나요?

1. 해당 API 웹사이트 접속
2. 노출된 키 삭제
3. 새 키 발급
4. config.ts 업데이트

### Q5: GitHub에 올려도 되나요?

**절대 안 됩니다!** API 키가 포함된 `src/server/config.ts`는 GitHub에 올리면 안 됩니다.

`.gitignore`에 추가:
```
src/server/config.ts
```

---

## 🎉 완료!

설정이 완료되면 끊김 없이 AI 챗봇을 사용할 수 있습니다!

**할당량 모니터링**:
- Gemini: https://makersuite.google.com/app/apikey
- Groq: https://console.groq.com/settings/limits
- DeepSeek: https://platform.deepseek.com/usage

**문제 발생 시**:
1. 로그 확인: `.tools/show-dev-logs.sh 50`
2. API 키 형식 확인
3. 할당량 확인
4. 네트워크 확인

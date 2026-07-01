# JamLounge Website

**JamLounge** 매장/공연/예약 안내를 위한 Vue 3 + Firebase 기반 웹사이트입니다. 메뉴, 공연 일정, 예약, 프리오더, 내부 사진, 관리자 콘텐츠 관리 화면을 한 프로젝트에 담았습니다.

## 주요 기능

- 매장 소개, 메뉴, 스토리, 공연 일정, 예약, 프리오더 페이지
- Firebase 기반 메뉴/사진/일정/예약 데이터 관리
- Firebase Auth를 활용한 관리자 화면 진입 구조
- Firestore, Storage, Realtime Database, Firebase Hosting 연동
- Vuetify 기반 반응형 UI

## 기술 스택

| 영역 | 사용 기술 |
| --- | --- |
| 프론트엔드 | Vue 3, Vite, Vue Router, Vuetify |
| 백엔드 서비스 | Firebase Auth, Firestore, Storage, Realtime Database |
| 호스팅 | Firebase Hosting |

## 실행 방법

```bash
npm install
cp .env.example .env.local
npm run dev
```

실제 Firebase 프로젝트에 연결하려면 `.env.local`에 Firebase Web App 설정값을 넣어야 합니다.

## 환경변수

Firebase 설정값은 소스 코드에 직접 넣지 않고 Vite 환경변수로 주입합니다. 브라우저 번들에 노출되는 값은 `VITE_` 접두사가 붙은 변수뿐입니다.

필수 변수:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_DATABASE_URL`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID` — Analytics를 쓸 때만 필요

Firebase Web API Key는 클라이언트 식별자에 가깝지만, 공개 앱에서는 반드시 Firestore/Storage/Realtime Database 보안 규칙과 Google Cloud API key 제한을 함께 설정해야 합니다.

## 스크립트

```bash
npm run dev      # 개발 서버
npm run build    # dist/ 정적 빌드
npm run preview  # 빌드 결과 미리보기
```

## 배포

Firebase Hosting용 GitHub Actions workflow가 포함되어 있습니다. 사용하려면 GitHub에 아래 값을 설정하세요.

- Secret: `FIREBASE_SERVICE_ACCOUNT_JAMLOUNGEPROJECT`
- Repository variables: `.env.example`에 있는 모든 `VITE_FIREBASE_*` 값

workflow는 `npm ci` → `npm run build` 후 생성된 `dist/`를 Firebase Hosting에 배포합니다.

## 보안 메모

- `.env`, `.env.local`, Firebase service-account JSON, `.firebase/` 캐시 파일은 커밋하지 않습니다.
- 관리자 화면은 UI일 뿐입니다. 실제 권한 통제는 Firebase 보안 규칙과 서비스 설정에서 강제해야 합니다.
- 공개 저장소에는 Firebase Web App 설정 실값을 두지 않고, GitHub Actions 변수 또는 로컬 `.env.local`로 주입합니다.

## 라이선스

MIT License. 자세한 내용은 [LICENSE](./LICENSE)를 참고하세요.

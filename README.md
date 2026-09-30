# JamLounge Website

JamLounge의 매장 정보, 메뉴, 공연 일정과 예약 안내를 한곳에서 보여주는 웹사이트입니다. 방문자용 페이지와 콘텐츠를 관리하는 관리자 화면을 Vue 3와 Firebase로 구성했습니다.

## 제공하는 화면

### 방문자

- 매장 소개와 공간 사진
- 카테고리별 메뉴와 이미지
- 공연·대관·특선 메뉴 일정
- 단체 대관용 프리오더 메뉴
- 외부 예약 페이지 연결
- Instagram, Facebook, 지도 바로가기

### 관리자

- 이메일과 비밀번호를 이용한 로그인
- 메뉴 카테고리, 메뉴와 메뉴 이미지 관리
- 공연·대관 일정 관리
- 내부 사진과 프리오더 메뉴 관리
- 예약 안내 항목 관리 화면

## 콘텐츠 흐름

메뉴, 일정, 사진과 프리오더 정보는 Firestore의 실시간 구독으로 불러옵니다. 관리자가 항목을 추가하거나 수정하면 같은 컬렉션을 읽는 방문자 화면에 변경 내용이 반영됩니다. 메뉴와 공간 사진 파일은 Firebase Storage에 올리고, Firestore에는 다운로드 URL과 설명을 저장합니다.

예약 페이지는 현재 매장 정보와 외부 예약 링크를 정적으로 표시합니다. 관리자 화면의 `reservationItems` 편집 기능은 방문자용 예약 페이지와 아직 연결되어 있지 않습니다.

## 기술 스택

| 영역 | 사용 기술 |
| --- | --- |
| 웹 UI | Vue 3, Vue Router, Vuetify |
| 빌드 | Vite |
| 콘텐츠 데이터 | Cloud Firestore |
| 이미지 | Firebase Storage |
| 관리자 로그인 | Firebase Authentication |
| 배포 | Firebase Hosting, GitHub Actions |

## 현재 상태와 운영 전 확인사항

이 저장소에는 방문자 화면, 관리자 화면과 Firebase Hosting 배포 구성이 들어 있습니다. 다만 새 Firebase 프로젝트에 복제해서 바로 운영할 수 있는 완성형 배포 묶음은 아닙니다.

- Firebase 프로젝트와 Web App을 만들고 Firestore, Storage, Authentication을 구성해야 합니다.
- 관리자 로그인에는 Firebase Authentication의 이메일/비밀번호 제공자와 사용자 계정이 필요합니다.
- 저장소에는 Firestore·Storage 보안 규칙과 초기 데이터가 포함되어 있지 않습니다.
- 현재 라우터는 로그인 여부만 확인하며 관리자 역할을 별도로 검증하지 않습니다.
- 브라우저의 라우트 가드는 보안 경계가 아닙니다. 데이터 쓰기 권한은 Firebase 보안 규칙에서 제한해야 합니다.

## 로컬 실행

GitHub Actions와 같은 Node.js 22 환경을 권장합니다.

```bash
npm install
cp .env.example .env.local
npm run dev
```

`.env.local`에는 Firebase Console에서 발급한 Web App 설정값을 입력합니다.

```env
VITE_FIREBASE_API_KEY=<web-api-key>
VITE_FIREBASE_AUTH_DOMAIN=<project-id>.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=<database-url>
VITE_FIREBASE_PROJECT_ID=<project-id>
VITE_FIREBASE_STORAGE_BUCKET=<storage-bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<sender-id>
VITE_FIREBASE_APP_ID=<app-id>
VITE_FIREBASE_MEASUREMENT_ID=<measurement-id>
```

`VITE_FIREBASE_MEASUREMENT_ID`는 Analytics를 사용할 때만 필요합니다. 현재 초기화 코드는 이 값을 제외한 설정이 비어 있으면 브라우저 콘솔에 경고를 표시합니다. 애플리케이션은 현재 Realtime Database가 아니라 Firestore를 콘텐츠 저장소로 사용합니다.

Firebase Web API Key는 service-account 비밀키가 아니며 브라우저 번들에 포함됩니다. 키를 숨기는 대신 Firestore·Storage 규칙과 Google Cloud API key 제한으로 접근 범위를 통제해야 합니다.

## 스크립트

```bash
npm run dev      # 개발 서버
npm run build    # dist/ 정적 빌드
npm run preview  # 빌드 결과 미리보기
```

## 배포 구성

`main` 브랜치 배포와 Pull Request 미리보기용 Firebase Hosting workflow가 들어 있습니다. 현재 workflow는 `jamloungeproject` 프로젝트와 `FIREBASE_SERVICE_ACCOUNT_JAMLOUNGEPROJECT` secret 이름을 사용합니다.

다른 Firebase 프로젝트에 적용하려면 다음 값을 함께 바꿔야 합니다.

1. 두 workflow의 `projectId`
2. 두 workflow가 참조하는 service-account secret 이름과 GitHub secret
3. `.env.example`에 대응하는 `VITE_FIREBASE_*` GitHub repository variables
4. 대상 Firebase 프로젝트의 Authentication, Firestore, Storage와 보안 규칙

workflow는 Node.js 22에서 `npm ci`와 `npm run build`를 실행한 뒤 `dist/`를 Firebase Hosting에 배포합니다.

## 보안 메모

- `.env`, `.env.local`, Firebase service-account JSON과 `.firebase/` 캐시를 커밋하지 않습니다.
- service-account 키는 GitHub Actions secret 등 서버 측 비밀 저장소에서만 관리합니다.
- 관리자 페이지를 숨기는 것만으로 데이터 접근을 막을 수 없습니다.
- 공개 읽기가 필요한 데이터와 관리자만 수정할 데이터를 보안 규칙에서 구분해야 합니다.

## 라이선스

[MIT License](./LICENSE)

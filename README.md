# Y-BLIND 🎭

> **당신의 속마음을 털어놓는 곳**

Y-BLIND는 사용자들이 익명으로 자신의 진솔한 이야기를 나눌 수 있는 소통 플랫폼입니다.

## ✨ 주요 기능

- 🔐 **안전한 로그인 시스템** - 개인정보 보호를 위한 보안 인증
- 📝 **익명 포스팅** - 편안하게 속마음을 표현할 수 있는 공간
- 📱 **모바일 최적화** - 언제 어디서나 편리한 접근
- 🎨 **세련된 UI/UX** - 직관적이고 아름다운 인터페이스

## 🛠 기술 스택

### Frontend

- **Next.js 15** - 최신 React 프레임워크
- **React 19** - 최신 React 버전
- **TypeScript** - 타입 안전성 보장
- **Tailwind CSS v4** - 현대적인 스타일링

### 상태 관리 & UI

- **TanStack React Query v5** - 서버 상태 관리
- **shadcn ui** - UI 컴포넌트 라이브러리
- **React Toastify** - 사용자 알림 시스템

### 개발 도구

- **ESLint** - 코드 품질 관리
- **Husky** - Git 훅 자동화
- **Lint-staged** - 커밋 전 코드 검사

### 디자인 시스템

- **Pretendard** - 한국어 최적화 폰트
- **커스텀 컬러 팔레트** - 브랜드 전용 색상 시스템
- **반응형 디자인** - 모바일/데스크톱 대응

## 🚀 시작하기

### 1. 환경 설정

```bash
# 저장소 클론
git clone <repository-url>
cd y-blind

# 의존성 설치
npm install
# 또는
yarn install
```

### 2. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

[http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

### 3. 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm run start
```

## 📱 화면 구성

### 메인 화면

- Y-BLIND 로고와 브랜드 메시지
- 로그인 버튼으로 서비스 접근

### 로그인 화면

- 아이디/비밀번호 기반 인증
- 사용자 친화적인 폼 디자인

### 포스트 화면 (개발 중)

- 익명 글 작성 및 조회 기능

## 🎨 디자인 시스템

### 컬러 팔레트

- **Primary**: Pink 계열 (#ff2488)
- **Secondary**: Gray 계열
- **Accent**: Blue, Sky, Green, Yellow

### 타이포그래피

- **Caption**: 10px - 12px (UI 보조 텍스트)
- **Body**: 13px - 16px (본문 텍스트)
- **Heading**: 18px - 30px (제목 텍스트)

### 반응형 브레이크포인트

- **Mobile**: 최대 480px
- **Desktop**: 최대 728px

## 🔧 개발 가이드

### 폴더 구조

```
src/
├── app/                 # Next.js App Router
│   ├── (home)/         # 홈 그룹 라우트
│   │   ├── (main)/     # 메인 페이지
│   │   ├── login/      # 로그인 페이지
│   │   └── posts/      # 포스트 페이지
│   ├── _provider/      # 전역 Provider
│   └── globals.css     # 전역 스타일
├── components/         # 재사용 컴포넌트
└── utils/             # 유틸리티 함수
```

### 코드 스타일

- **ESLint** 규칙 준수
- **TypeScript** 엄격 모드
- **Tailwind CSS** 클래스 기반 스타일링
- **함수형 컴포넌트** 사용

### 커밋 규칙

Husky와 lint-staged를 통해 커밋 전 자동으로 다음을 수행합니다:

- ESLint 검사
- Prettier 포맷팅

---

**Y-BLIND**에서 당신의 진솔한 이야기를 들려주세요. 🎭✨

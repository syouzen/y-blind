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
- **React Toastify** - 토스트 알림
- **Event System** - Alert/Confirm 다이얼로그 관리

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
│   │   └── write/      # 글 작성 페이지
│   ├── _components/    # 앱 전역 컴포넌트
│   ├── _provider/      # 전역 Provider
│   └── globals.css     # 전역 스타일
├── components/         # 재사용 컴포넌트
│   ├── ui/            # shadcn UI 컴포넌트
│   ├── alert.tsx      # Alert 다이얼로그
│   └── confirm.tsx    # Confirm 다이얼로그
├── contexts/          # React Context
│   └── event.tsx      # Event Provider (Alert/Confirm)
├── hooks/             # Custom Hooks
│   └── event.tsx      # useEvent Hook
├── lib/               # 라이브러리 & 유틸리티
│   ├── api.ts         # Axios 인스턴스 & 인터셉터
│   └── utils.ts       # 유틸리티 함수
├── query/             # API 요청 함수
│   ├── auth-api.tsx   # 인증 API
│   └── post-api.tsx   # 포스트 API
└── types/             # TypeScript 타입 정의
    ├── api-payload.ts # API 요청 타입
    └── api-response.ts # API 응답 타입
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

## 💡 이벤트 시스템 (useEvent)

Y-BLIND는 통합된 이벤트 시스템으로 Alert와 Confirm 다이얼로그를 관리합니다.

### 사용 방법

```typescript
import useEvent from "@/hooks/event";

function MyComponent() {
  const { showAlert, hideAlert, showConfirm, hideConfirm } = useEvent();

  // Alert 다이얼로그 표시
  const handleSuccess = () => {
    showAlert({
      title: "성공",
      content: "작업이 완료되었습니다.",
      label: "확인",
      onConfirm: () => {
        console.log("확인 버튼 클릭");
      },
    });
  };

  // Confirm 다이얼로그 표시
  const handleDelete = () => {
    showConfirm({
      title: "삭제 확인",
      content: "정말로 삭제하시겠습니까?",
      confirmLabel: "삭제",
      cancelLabel: "취소",
      danger: true,
      onConfirm: () => {
        // 삭제 로직
      },
    });
  };

  return (
    <div>
      <button onClick={handleSuccess}>성공 알림</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}
```

### Alert 옵션

- `title`: 다이얼로그 제목
- `content`: 다이얼로그 내용
- `label`: 확인 버튼 텍스트 (기본값: "확인")
- `disableBackClick`: 배경 클릭으로 닫기 비활성화 (기본값: false)
- `onConfirm`: 확인 버튼 클릭 시 실행될 콜백

### Confirm 옵션

- `title`: 다이얼로그 제목
- `content`: 다이얼로그 내용
- `confirmLabel`: 확인 버튼 텍스트 (기본값: "네")
- `cancelLabel`: 취소 버튼 텍스트 (기본값: "아니오")
- `danger`: 위험한 동작 표시 (삭제 등, 기본값: false)
- `disableBackClick`: 배경 클릭으로 닫기 비활성화 (기본값: false)
- `onConfirm`: 확인 버튼 클릭 시 실행될 콜백

## 🌐 API 통신

Y-BLIND는 Axios 기반의 체계적인 API 통신 구조를 제공합니다.

### API 클라이언트 구조

모든 API 요청은 ES2015 모듈 구문으로 작성되어 있으며, TypeScript로 타입 안정성을 보장합니다.

### 인증 API

```typescript
import { AuthApi } from "@/query/auth-api";

// 회원가입
const result = await AuthApi.join({
  userId: "user123",
  password: "password123",
  nickname: "닉네임",
});

// 로그인
const result = await AuthApi.login({
  userId: "user123",
  password: "password123",
});
```

### 포스트 API

```typescript
import { PostApi } from "@/query/post-api";

// 포스트 작성
const result = await PostApi.createPost({
  title: "포스트 제목",
  content: "포스트 내용",
});

// 포스트 목록 조회
const result = await PostApi.getPostList({
  page: 1,
  limit: 20,
});
```

### TanStack Query 활용

```typescript
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthApi } from "@/query/auth-api";
import { PostApi } from "@/query/post-api";

function MyComponent() {
  // 포스트 목록 조회
  const { data, isLoading } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => PostApi.getPostList({ page, limit: 20 }),
  });

  // 로그인 Mutation
  const loginMutation = useMutation({
    mutationFn: AuthApi.login,
    onSuccess: (data) => {
      console.log("로그인 성공", data);
    },
  });

  return <div>...</div>;
}
```

### API 타입 정의

모든 API는 TypeScript 인터페이스로 정의되어 있습니다:

- **Payload 타입**: `src/types/api-payload.ts`
- **Response 타입**: `src/types/api-response.ts`

```typescript
// 요청 타입 예시
interface IUserLoginPayload {
  userId: string;
  password: string;
}

// 응답 타입 예시
interface IResultResponse {
  success: boolean;
  message: string;
  data?: any;
}
```

---

**Y-BLIND**에서 당신의 진솔한 이야기를 들려주세요. 🎭✨

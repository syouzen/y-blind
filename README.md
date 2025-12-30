# Y-BLIND 🎭

**익명으로 나누는 진솔한 이야기**

---

## 📖 소개

Y-BLIND는 사용자들이 익명으로 자유롭게 소통할 수 있는 커뮤니티 플랫폼입니다.

## ✨ 주요 기능

| 기능           | 설명                                 |
| -------------- | ------------------------------------ |
| 🔐 인증        | NextAuth 기반 안전한 로그인/회원가입 |
| 📝 익명 포스팅 | 편하게 속마음을 표현하는 익명 게시판 |
| 💬 댓글        | 포스트에 댓글 작성 및 조회           |
| ❤️ 좋아요      | 공감하는 포스트에 좋아요             |
| 🎮 미니게임    | 점심 메뉴 추천 룰렛 등               |

---

## 🛠 기술 스택

### Core

- **Next.js 16** + **React 19**
- **TypeScript 5**
- **Tailwind CSS v4**

### 상태관리 & 데이터

- **TanStack React Query v5** - 서버 상태
- **Zustand** - 클라이언트 상태
- **React Hook Form** + **Zod** - 폼 관리 & 유효성 검증

### UI

- **shadcn/ui** + **Radix UI**
- **Framer Motion** - 애니메이션
- **Lucide React** - 아이콘
- **React Quill** - 리치 텍스트 에디터
- **React Virtuoso** - 가상화 리스트

### 인증

- **NextAuth v5 (Beta)**

### 개발 도구

- **ESLint** + **Prettier**
- **Husky** + **Lint-staged**

---

## 🚀 시작하기

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd y-blind

# 의존성 설치
yarn install
```

### 개발 서버

```bash
yarn dev
```

→ [http://localhost:3000](http://localhost:3000)

### 프로덕션 빌드

```bash
yarn build && yarn start
```

---

## 📁 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── (home)/                   # 메인 라우트 그룹
│   │   ├── (main)/               # 메인 피드
│   │   ├── sign-in/              # 로그인
│   │   ├── sign-up/              # 회원가입
│   │   ├── write/                # 글 작성
│   │   └── mini-game/            # 미니게임
│   │       └── recommend-lunch-menu/
│   ├── _components/              # 앱 전역 컴포넌트
│   ├── _provider/                # Provider (RQ, Session)
│   └── api/                      # API Routes
├── components/                   # 공통 컴포넌트
│   └── ui/                       # shadcn/ui
├── contexts/                     # React Context
├── hooks/                        # Custom Hooks
├── lib/                          # 유틸리티
├── query/                        # API 함수
├── store/                        # Zustand Store
└── types/                        # TypeScript 타입
```

---

## 💡 주요 패턴

### Alert / Confirm 다이얼로그

```typescript
import useEvent from "@/hooks/event";

const { showAlert, showConfirm } = useEvent();

// Alert
showAlert({
  title: "알림",
  content: "작업이 완료되었습니다.",
  onConfirm: () => {
    /* ... */
  },
});

// Confirm
showConfirm({
  title: "삭제",
  content: "정말 삭제하시겠습니까?",
  danger: true,
  onConfirm: () => {
    /* 삭제 로직 */
  },
});
```

### API 호출

```typescript
import { PostApi } from "@/query/post-api";
import { useQuery, useMutation } from "@tanstack/react-query";

// 조회
const { data } = useQuery({
  queryKey: ["posts"],
  queryFn: () => PostApi.getPostList({ page: 1, limit: 20 }),
});

// 생성
const mutation = useMutation({
  mutationFn: PostApi.createPost,
});
```

---

## 🎨 디자인 시스템

- **Font**: Pretendard (한국어 최적화)
- **Primary Color**: Sky/Blue 계열 (`#0ea5e9`)
- **Responsive**: Mobile-first, max-width 1024px

---

## 📜 라이선스

Private

---

**Y-BLIND** - 당신의 이야기를 들려주세요 🎭

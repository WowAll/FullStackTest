# PostApp - 모던 풀스택 갤러리 애플리케이션

다크 테마와 글래스모피즘(Glassmorphism) 디자인이 적용된 **프리미엄 갤러리형 웹 애플리케이션**입니다.
Next.js(App Router)와 NestJS로 구축되었으며, 모던한 UI와 견고한 백엔드 아키텍처를 자랑합니다.

![UI Showcase](https://via.placeholder.com/800x400?text=Premium+Dark+UI+Showcase)

## 🚀 주요 특징

### 🎨 Premium UI/UX
- **모던 다크 테마**: Slate-900 기반의 깊이감 있는 다크 모드.
- **글래스모피즘**: `backdrop-blur` 효과를 활용한 투명하고 세련된 카드 디자인.
- **반응형 그리드 레이아웃**: 게시글을 갤러리 형태(Grid)로 아름답게 배치.
- **인터랙션**: 부드러운 호버 효과 및 애니메이션 적용.
- **뷰 모드 분리**:
    - **목록(List View)**: 수정/삭제 방해 요소가 없는 **순수 갤러리 감상 모드**.
    - **상세(Detail View)**: 댓글 작성 및 수정/삭제가 가능한 **인터랙션 모드**.

### 🛠️ 기술 스택

#### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS, CSS Modules
- **State Management**: React Query (TanStack Query) - **Custom Hooks 패턴 적용**
- **Authentication**: JWT, Secure Cookies

#### Backend
- **Framework**: NestJS (Modular Architecture)
- **Database**: PostgreSQL
- **ORM**: Prisma (Auto-generated Type-safe Client)
- **API Docs**: Swagger (Auto-generated)
- **Security**: BCrypt hashing, Guards, Interceptors

#### Infrastructure
- **Container**: Docker, Docker Compose
- **Proxy/LB**: Nginx
- **Availability**: Health Checks implemented

---

## 📁 프로젝트 구조

```
ReactPage/
├── frontend/              # Next.js 클라이언트
│   ├── src/app/          # App Router 페이지
│   ├── src/components/   # 재사용 가능한 UI 컴포넌트
│   ├── src/hooks/        # 비즈니스 로직 (Custom Hooks)
│   └── src/lib/          # 유틸리티 (API Fetcher 등)
├── backend/              # NestJS 서버
│   ├── src/modules/      # 기능 모듈 (Posts, Auth, Users 등)
│   ├── prisma/           # DB 스키마 및 마이그레이션
│   └── test/             # E2E 테스트
├── nginx/                # 리버스 프록시 설정
└── docker-compose.lb.yml # 프로덕션용 오케스트레이션
```

---

## 🚀 빠른 시작 (Quick Start)

Docker 하나로 전체 스택을 즉시 실행할 수 있습니다.

### 1. 실행
```bash
# Nginx를 포함한 풀스택 실행 (권장)
docker-compose -f docker-compose.lb.yml up --build -d
```

### 2. 접속
- **Web App**: http://localhost
- **API Docs**: http://localhost/docs
- **Prisma Studio**: `docker exec -it nestjs_backend npx prisma studio` (localhost:5555)

---

## 📝 API 엔드포인트

모든 API는 `/posts` 리소스를 중심으로 설계되었습니다.

### Posts (게시글)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/posts` | 전체 게시글 목록 (Pagination) | Public |
| `GET` | `/posts/:id` | 게시글 상세 조회 | Public |
| `POST` | `/posts` | 새 게시글 작성 | **User** |
| `PATCH` | `/posts/:id` | 게시글 수정 | **Owner** |
| `DELETE` | `/posts/:id` | 게시글 삭제 | **Owner** |

### Comments (댓글)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/posts/:postId/comments` | 댓글 목록 조회 | Public |
| `POST` | `/posts/:postId/comments` | 댓글 작성 | **User** |

---

## 🗄️ 데이터베이스 스키마

**Post** 모델을 중심으로 **User**와 **Comment**가 관계를 맺고 있습니다.

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  posts     Post[]   // 1:N Relation
  comments  Comment[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String   @db.Text
  thumbnail String?  // 썸네일 이미지 URL
  writer    User     @relation(fields: [writerId], references: [id])
  comments  Comment[]
  views     Int      @default(0)
}

model Comment {
  id        Int      @id @default(autoincrement())
  content   String   @db.Text
  post      Post     @relation(fields: [postId], references: [id])
  writer    User     @relation(fields: [writerId], references: [id])
}
```

---

## 👨‍💻 개발 가이드

### 커스텀 훅 (Hooks) 패턴
이 프로젝트는 UI와 비즈니스 로직을 철저히 분리합니다. 컴포넌트 내에서 직접 `fetch`를 호출하지 마세요.

**Bad:**
```javascript
// ❌ 컴포넌트에 로직 혼재
useEffect(() => { fetch('/api/posts')... }, []);
```

**Good:**
```javascript
// ✅ 훅을 통한 로직 위임
const { data: posts } = useAllPosts();
```

---

## 📜 License
MIT License

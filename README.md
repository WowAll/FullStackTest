# DarkApp - 풀스택 웹 애플리케이션

다크 테마를 적용한 모던 풀스택 웹 애플리케이션. 사용자 인증, 게시물, 댓글 기능 제공.

## 🚀 기술 스택

### 프론트엔드
- **프레임워크:** Next.js 14 (App Router)
- **스타일링:** Tailwind CSS
- **상태 관리:** React Query
- **UI 테마:** 다크 모드 + 글래스모피즘

### 백엔드
- **프레임워크:** NestJS
- **데이터베이스:** PostgreSQL
- **ORM:** Prisma
- **인증:** JWT (JSON Web Tokens)

### 인프라
- **컨테이너화:** Docker & Docker Compose
- **로드 밸런서:** Nginx
- **아키텍처:** 마이크로서비스

---

## 📁 프로젝트 구조

```
ReactPage/
├── frontend/              # Next.js 애플리케이션
│   ├── src/
│   │   ├── app/          # App Router 페이지
│   │   ├── components/   # React 컴포넌트
│   │   ├── hooks/        # 커스텀 훅
│   │   └── lib/          # 유틸리티
│   └── Dockerfile
├── backend/              # NestJS 애플리케이션
│   ├── src/
│   │   ├── modules/      # 기능 모듈
│   │   ├── prisma/       # 데이터베이스 서비스
│   │   ├── common/       # 공통 리소스
│   │   └── config/       # 설정
│   ├── prisma/           # 데이터베이스 스키마
│   └── Dockerfile
├── nginx/                # Nginx 설정
└── docker-compose.lb.yml # Docker 오케스트레이션
```

---

## 🎨 주요 기능

### 인증
- ✅ 이메일/비밀번호 회원가입
- ✅ JWT 기반 로그인
- ✅ bcrypt 비밀번호 해싱
- ✅ 보호된 라우트
- ✅ 자동 토큰 관리

### 게시물 (Boards)
- ✅ 게시물 생성, 조회, 수정, 삭제
- ✅ 조회수 카운터
- ✅ 사용자별 게시물 관리 ("내 게시물")
- ✅ 리치 텍스트 콘텐츠 지원

### 댓글
- ✅ 게시물에 댓글 작성
- ✅ 본인 댓글 수정/삭제
- ✅ 작성자 정보 표시
- ✅ 실시간 업데이트

### UI/UX
- ✅ 모던 다크 테마
- ✅ 그라데이션 배경
- ✅ 글래스모피즘 효과
- ✅ 부드러운 애니메이션 (blob 효과)
- ✅ 반응형 디자인

---

## 🚀 빠른 시작

### 사전 준비사항
- Docker & Docker Compose 설치
- 포트 80, 5432 사용 가능

### 1. 클론 & 설정

```bash
git clone <repository>
cd ReactPage
```

### 2. 환경 변수

환경 변수 파일 생성:

**백엔드** (`backend/.env`):
```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/nestdb"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=4000
NODE_ENV=development
```

**프론트엔드** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost
```

### 3. 서비스 시작

#### 🚀 방법 1: Production 스타일 (Nginx 포함) - **추천**

Nginx 로드밸런서를 사용한 실제 배포 환경과 유사한 구조입니다.

```bash
docker-compose -f docker-compose.lb.yml up -d
```

**접속:**
- 전체 애플리케이션: http://localhost
- Frontend: http://localhost (자동 라우팅)
- Backend API: http://localhost/api (자동 라우팅)

**특징:**
- ✅ 하나의 포트(80)로 모든 서비스 접근
- ✅ CORS 문제 없음
- ✅ Production 환경과 동일한 구조
- ✅ Nginx 리버스 프록시 사용

---

#### 🔧 방법 2: 개발 모드 (직접 접근)

각 서비스를 독립적으로 직접 접근하는 간단한 구조입니다.

```bash
docker-compose up -d
```

**접속:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Database: localhost:5432

**특징:**
- ✅ 간단한 구조
- ✅ 각 서비스 독립적 테스트 가능
- ✅ 디버깅 편리
- ⚠️ CORS 설정 필요 (이미 적용됨)

---

> **💡 권장:** 실제 배포 환경과 유사한 **방법 1 (docker-compose.lb.yml)** 사용을 권장합니다.

### 4. 데이터베이스 마이그레이션

```bash
docker exec nestjs_backend npx prisma migrate deploy
```

### 5. 애플리케이션 접속

- **프론트엔드:** http://localhost
- **백엔드 API:** http://localhost/api
- **헬스 체크:** http://localhost/api/health

---

## 📝 API 엔드포인트

### 인증
```
POST /api/auth/signup      # 회원가입
POST /api/auth/login       # 로그인
```

### 사용자
```
GET  /api/users/me         # 현재 사용자 조회 (보호됨)
```

### 게시물
```
GET  /api/boards/me        # 내 게시물 목록 (보호됨)
POST /api/boards           # 게시물 작성 (보호됨)
PATCH /api/boards/:id      # 게시물 수정 (보호됨)
DELETE /api/boards/:id     # 게시물 삭제 (보호됨)
```

### 댓글
```
GET  /api/boards/:boardId/comments  # 댓글 목록 조회
POST /api/boards/:boardId/comments  # 댓글 작성 (보호됨)
PATCH /api/comments/:id             # 댓글 수정 (보호됨)
DELETE /api/comments/:id            # 댓글 삭제 (보호됨)
```

---

## 🗄️ 데이터베이스 스키마

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  boards    Board[]
  comments  Comment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Board {
  id        Int      @id @default(autoincrement())
  title     String
  content   String   @db.Text
  writerId  Int
  writer    User     @relation(...)
  comments  Comment[]
  views     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Comment {
  id        Int      @id @default(autoincrement())
  content   String   @db.Text
  boardId   Int
  board     Board    @relation(...)
  writerId  Int
  writer    User     @relation(...)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🛠️ 개발 가이드

### 로컬에서 실행 (Docker 없이)

**백엔드:**
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

**프론트엔드:**
```bash
cd frontend
npm install
npm run dev
```

### Prisma Studio (데이터베이스 GUI)

```bash
docker exec -it nestjs_backend npx prisma studio
```

접속: http://localhost:5555

---

## 🎯 사용 방법

### 1. 회원가입
- http://localhost/signup 접속
- 이메일, 비밀번호, 이름 입력
- "Create Account" 클릭

### 2. 로그인
- http://localhost/login 접속
- 계정 정보 입력
- "내 게시물" 페이지로 자동 이동

### 3. 게시물 작성
- "+ New Post" 버튼 클릭
- 제목과 내용 입력
- "Create Post" 클릭

### 4. 댓글 작성
- 게시물의 "💬 Comments" 클릭
- 댓글 입력
- "Post Comment" 클릭

---

## 🐳 Docker 명령어

### Production 스타일 (Nginx 포함)

```bash
# 서비스 시작
docker-compose -f docker-compose.lb.yml up -d

# 서비스 중지
docker-compose -f docker-compose.lb.yml down

# 로그 확인
docker-compose -f docker-compose.lb.yml logs -f

# 특정 서비스 재시작
docker-compose -f docker-compose.lb.yml restart backend
docker-compose -f docker-compose.lb.yml restart frontend

# 모든 데이터 삭제 (주의!)
docker-compose -f docker-compose.lb.yml down -v
```

### 개발 모드 (직접 접근)

```bash
# 서비스 시작
docker-compose up -d

# 서비스 중지
docker-compose down

# 로그 확인
docker-compose logs -f

# 특정 서비스 재시작
docker-compose restart backend
docker-compose restart frontend
```

---

## 🔒 보안 기능

- ✅ bcrypt 비밀번호 해싱 (cost: 10)
- ✅ JWT 토큰 기반 인증
- ✅ 가드를 통한 API 엔드포인트 보호
- ✅ 모든 입력값 DTO 검증
- ✅ API 응답에서 비밀번호 제외
- ✅ CORS 설정
- ✅ SQL 인젝션 방지 (Prisma)

---

## 📦 주요 패키지

### 백엔드
- `@nestjs/core` - NestJS 프레임워크
- `@nestjs/jwt` - JWT 인증
- `@prisma/client` - 데이터베이스 ORM
- `bcrypt` - 비밀번호 해싱
- `class-validator` - 입력값 검증
- `class-transformer` - DTO 변환

### 프론트엔드
- `next` - React 프레임워크
- `@tanstack/react-query` - 데이터 페칭
- `tailwindcss` - 스타일링

---

## 🎨 디자인 시스템

### 색상 팔레트
- **배경:** Gray-900, Slate-900, Black
- **그라데이션:** Purple-600 → Blue-600
- **카드:** Gray-800/50 (반투명)
- **텍스트:** Gray-300, Gray-400
- **강조:** Purple-400, Blue-400

### 효과
- `backdrop-blur-xl`을 사용한 글래스모피즘
- 그라데이션 섀도우
- Blob 애니메이션
- 부드러운 트랜지션

---

## 🚧 향후 개선 사항

- [ ] 리프레시 토큰 구현
- [ ] 비밀번호 재설정 기능
- [ ] 아바타가 있는 사용자 프로필
- [ ] 게시물 카테고리/태그
- [ ] 검색 기능
- [ ] 페이지네이션
- [ ] 좋아요/싫어요 시스템
- [ ] 실시간 알림
- [ ] 파일 업로드 지원

---

## 📄 라이선스

MIT

---

## 👨‍💻 개발자

현대적인 웹 기술로 ❤️를 담아 제작

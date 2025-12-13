# Fullstack Project: Next.js + NestJS + PostgreSQL

풀스택 웹 애플리케이션 (Next.js Frontend + NestJS Backend + PostgreSQL Database)

## ⚙️ 초기 설정

### 환경 변수 설정

프로젝트를 실행하기 전에 루트 디렉토리에 `.env` 파일을 생성하세요:

```bash
# .env.example 파일을 복사
cp .env.example .env
```

`.env` 파일 내용:
```bash
# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nestdb

# Backend API URL (used by frontend)
NEXT_PUBLIC_API_URL=http://localhost:4000
```

> [!NOTE]
> `.env` 파일은 Git에 커밋되지 않습니다. 필요한 경우 값을 수정하여 사용하세요.

## 🚀 Quick Start

> [!IMPORTANT]
> **Docker 사용을 강력히 권장합니다!** 환경 설정이 자동화되어 있어 단 한 번의 명령으로 전체 스택을 실행할 수 있습니다.

### Docker로 전체 스택 실행

```bash
# 전체 스택 실행 (Frontend + Backend + Database)
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 종료
docker-compose down
```

<details>
<summary>💡 로컬 개발 모드 (선택사항 - Docker 사용 권장)</summary>

> [!WARNING]
> 로컬 개발 모드는 환경 설정이 복잡합니다. **Docker 사용을 강력히 권장합니다.**

```bash
# 1. 데이터베이스만 Docker로 실행
docker-compose up -d db

# 2. Backend .env 파일 생성 (처음 1회)
cd backend
cp .env.example .env

# 3. Backend 로컬 실행
npm install
npm run start:dev

# 4. Frontend 로컬 실행 (새 터미널)
cd frontend
npm install
npm run dev
```

</details>

## 📦 프로젝트 구조

- **frontend/**: Next.js 프론트엔드 (포트 3000)
- **backend/**: NestJS TypeScript 백엔드 (포트 4000)
- **docker-compose.yml**: Docker 서비스 설정
- **.env.example**: 환경 변수 템플릿

## 🛠️ 기술 스택

- **Frontend**: Next.js, React, JavaScript
- **Backend**: NestJS, TypeScript, Prisma ORM
- **Database**: PostgreSQL 15
- **Admin Tools**: Adminer (PostgreSQL GUI)
- **DevOps**: Docker, Docker Compose

## 📖 상세 문서

더 자세한 사용법은 각 디렉토리의 README를 참고하세요:
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## 🔗 서비스 접속

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Adminer (DB 관리)**: http://localhost:8080
- **PostgreSQL**: localhost:5432

## 🧪 개발 환경

### Docker 개발 모드

```bash
# 특정 서비스만 재시작
docker-compose restart frontend
docker-compose restart backend

# 컨테이너 내부 접속
docker exec -it nextjs_frontend sh
docker exec -it nestjs_backend sh

# Adminer - PostgreSQL GUI (이미 실행 중)
# 브라우저에서 http://localhost:8080 접속
# 로그인: 시스템=PostgreSQL, 서버=db, 사용자=postgres, 비밀번호=postgres, DB=nestdb

# Prisma Studio (수동 실행)
docker exec -it nestjs_backend npx prisma studio --port 5555
# 브라우저에서 http://localhost:5555 접속
```

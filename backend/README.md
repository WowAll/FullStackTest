# Backend - NestJS API

NestJS 기반의 RESTful API 백엔드 서버입니다.

## 🚀 실행 방법

### Docker로 실행 (권장)

```bash
# 루트 디렉토리에서
docker-compose up -d backend

# 또는 전체 스택 실행
docker-compose up -d
```

API는 [http://localhost:4000](http://localhost:4000)에서 접속 가능합니다.

<details>
<summary>💡 로컬 개발 환경 설정 (선택사항 - Docker 권장)</summary>

> [!WARNING]
> 로컬 개발은 복잡한 환경 설정이 필요합니다. **Docker 사용을 강력히 권장합니다.**

### 환경 변수 설정

로컬에서 개발하려면 `backend/.env` 파일이 필요합니다:

```bash
# backend 디렉토리에서
cp .env.example .env
```

`.env` 파일 내용:
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestdb"
PORT=4000
```

### 로컬 실행

```bash
# 의존성 설치
npm install

# 데이터베이스 마이그레이션
npx prisma migrate dev

# 개발 서버 실행
npm run start:dev
```

</details>

## 📦 기술 스택

- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL 15
- **Validation**: class-validator, class-transformer

## 🏗️ 프로젝트 구조

```
src/
├── main.ts           # 애플리케이션 진입점
├── app.module.ts     # 루트 모듈
├── app.controller.ts # 루트 컨트롤러
└── app.service.ts    # 루트 서비스

prisma/
├── schema.prisma     # 데이터베이스 스키마
└── migrations/       # 마이그레이션 파일
```

## 🔧 주요 스크립트

```bash
npm run start         # 서버 실행
npm run start:dev     # 개발 모드 (Hot Reload)
npm run start:prod    # 프로덕션 모드
npm run build         # 빌드
npm run test          # 단위 테스트
npm run test:e2e      # E2E 테스트
```

## 🗄️ 데이터베이스 관리

### Prisma Studio

```bash
# Docker 환경
docker exec -it nestjs_backend npx prisma studio

# 로컬 환경
npx prisma studio
```

브라우저에서 [http://localhost:5555](http://localhost:5555) 접속

### Prisma 마이그레이션

```bash
# 새 마이그레이션 생성
npx prisma migrate dev --name migration_name

# 마이그레이션 적용
npx prisma migrate deploy

# Prisma Client 재생성
npx prisma generate
```

## 🌐 환경 변수

`.env` 파일 예시:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestdb"
PORT=4000
```

## 📚 API 문서

서버 실행 후 다음 엔드포인트에서 API 문서 확인:

- Swagger UI: [http://localhost:4000/api](http://localhost:4000/api) (추가 예정)

## 🔗 추가 리소스

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

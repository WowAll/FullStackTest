# Fullstack Project: Next.js + NestJS + PostgreSQL

풀스택 웹 애플리케이션 (Next.js Frontend + NestJS Backend + PostgreSQL Database)

## 🚀 Quick Start

```bash
# Docker로 백엔드 및 데이터베이스 실행
docker-compose up -d

# Frontend 실행
cd frontend
npm run dev

# Backend API 테스트
curl http://localhost:4000
```

## 📦 프로젝트 구조

- **frontend/**: Next.js 프론트엔드 (포트 3000)
- **backend/**: NestJS TypeScript 백엔드 (포트 4000)
- **docker-compose.yml**: PostgreSQL + Backend Docker 설정

## 🛠️ 기술 스택

- **Frontend**: Next.js, React, TypeScript
- **Backend**: NestJS, TypeScript, Prisma ORM
- **Database**: PostgreSQL 15
- **DevOps**: Docker, Docker Compose

## 📖 상세 문서

더 자세한 사용법은 각 디렉토리의 README를 참고하세요:
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## 🔗 API Endpoints

- Backend API: http://localhost:4000
- Frontend: http://localhost:3000
- PostgreSQL: localhost:5432

## 🧪 개발 환경

```bash
# Backend 개발
cd backend
npm run start:dev

# Frontend 개발
cd frontend
npm run dev

# Prisma Studio (DB GUI)
cd backend
npx prisma studio
```

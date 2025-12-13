# Frontend - Next.js Application

Next.js 14 기반의 풀스택 애플리케이션 프론트엔드입니다.

## 🚀 실행 방법

### Docker로 실행 (권장)

```bash
# 루트 디렉토리에서
docker-compose up -d frontend

# 또는 전체 스택 실행
docker-compose up -d
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

<details>
<summary>💡 로컬 개발 모드 (선택사항 - Docker 권장)</summary>

> [!WARNING]
> **Docker 사용을 권장합니다.** 로컬 개발은 Node.js 버전 호환성 등 추가 설정이 필요할 수 있습니다.

```bash
npm install
npm run dev
```

</details>

## 📦 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **State Management**: React Context API

## 🏗️ 프로젝트 구조

```
src/
├── app/              # Next.js App Router 페이지
│   ├── (auth)/      # 인증 관련 페이지 (로그인, 회원가입)
│   ├── layout.js    # 루트 레이아웃
│   └── page.js      # 홈 페이지
├── components/       # 재사용 가능한 컴포넌트
│   ├── common/      # 공통 컴포넌트
│   └── ui/          # UI 라이브러리 컴포넌트
└── lib/             # 유틸리티 함수
```

## 🔧 주요 스크립트

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run lint         # ESLint 실행
```

## 🌐 환경 변수

`.env.local` 파일을 생성하여 환경 변수를 설정하세요:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 📚 추가 리소스

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)

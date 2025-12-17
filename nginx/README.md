# Nginx 로드 밸런서 방식 가이드

## 설정 변경 사항

### 1. Nginx 설정
```
nginx/nginx.conf
```
- `/` → Next.js (프론트엔드)
- `/api` → NestJS (백엔드)

### 2. Docker Compose
```
docker-compose.lb.yml
```
- **Nginx**: 80 포트 오픈
- **Frontend/Backend**: 외부 포트 닫음 (expose만)

### 3. 환경변수
```yaml
frontend:
  environment:
    - NEXT_PUBLIC_API_URL=/api  # 상대 경로!
```

---

## 사용 방법

### 1. 디렉토리 생성
```bash
mkdir nginx
```

### 2. 실행
```bash
docker-compose -f docker-compose.lb.yml up -d
```

### 3. 접속
```
http://localhost          # Frontend
http://localhost/api      # Backend API
http://localhost:8080     # Adminer
```

---

## 주요 변경점

### Before (현재)
```
Browser → localhost:3000 (Frontend)
Browser → localhost:4000 (Backend) - CORS 필요
```

### After (로드 밸런서)
```
Browser → localhost (Nginx)
           ├─ /      → Frontend
           └─ /api   → Backend
```

---

## 장점

1. **Single Port**: 하나의 포트(80)만 오픈
2. **Same Origin**: CORS 문제 없음
3. **보안**: Backend 직접 노출 안 됨
4. **프로덕션 패턴**: 실제 배포 구조와 동일

---

## API 호출 변경

### Before
```javascript
const API_URL = 'http://localhost:4000';
api.get('/users')  // → http://localhost:4000/users
```

### After
```javascript
const API_URL = '/api';  // 상대 경로
api.get('/users')  // → /api/users → Nginx → Backend
```

---

## 테스트

```bash
# Frontend
curl http://localhost

# Backend API
curl http://localhost/api/users

# Health check
curl http://localhost/api/health/ready
```

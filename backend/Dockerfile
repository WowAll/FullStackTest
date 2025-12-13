# Development stage
FROM node:20-alpine

WORKDIR /app

# 1. Copy package files first (changed only when dependencies change)
COPY package*.json ./

# 2. Install dependencies (slowest step - cache this!)
RUN npm ci

# 3. Copy Prisma files (changed when schema changes)
COPY prisma ./prisma/
COPY prisma.config.ts ./

# 4. Copy source code (changed most frequently)
COPY . .

# Expose port
EXPOSE 4000

# Generate Prisma Client at runtime and start in development mode
CMD ["sh", "-c", "npx prisma generate && npm run start:dev"]


# ========================
# Build
# ========================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# ========================
# Runtime
# ========================
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# NÃO copie .env no Dockerfile (boa prática)
# Use docker-compose ou variáveis de ambiente

EXPOSE 3000

# 🔥 comando correto
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]

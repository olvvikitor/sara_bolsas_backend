# =========================
# Fase 1: Build da aplicação
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos necessários para instalar as dependências
COPY package.json package-lock.json ./

# Instala dependências (com npm 7+ pode precisar de legacy-peer-deps)
RUN npm install --legacy-peer-deps

# Copia o restante da aplicação
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Compila a aplicação
RUN npm run build


# =========================
# Fase 2: Imagem final leve
# =========================
FROM node:20-alpine

WORKDIR /app

# Copia apenas o necessário da imagem anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./  # importante se você usar Prisma com env

EXPOSE 3000

# Executa migrations e inicia o app
CMD npx prisma migrate deploy && node dist/main.js
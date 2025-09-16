# =========================
# Runner final
# =========================
FROM node:20-alpine AS runner

WORKDIR /app

# Copia só o necessário do build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# Instala apenas dependências de produção
RUN npm install --omit=dev --legacy-peer-deps

# Gera o Prisma Client (com base no schema copiado)
RUN npx prisma generate

EXPOSE 3000

# Executa migrations e inicia a aplicação
CMD npx prisma migrate deploy && node dist/main.js

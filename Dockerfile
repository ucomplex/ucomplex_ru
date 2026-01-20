# Используем официальный Node.js образ
FROM node:20-alpine AS base

# Устанавливаем зависимости только когда нужно
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json* ./
RUN npm ci

# Билдим приложение
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Проверяем, что PDF файлы скопировались
RUN echo "📄 Проверяем наличие PDF файлов:" && \
    ls -lh public/ucdocs/ || echo "⚠️ Папка ucdocs не найдена!"

# Отключаем телеметрию Next.js
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production образ, копируем все файлы и запускаем next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем public директорию включая PDF файлы
COPY --from=builder /app/public ./public

# Проверяем что файлы на месте
RUN echo "📄 Проверяем PDF файлы в финальном образе:" && \
    ls -lh public/ucdocs/ || echo "⚠️ Папка ucdocs не найдена!"

# Автоматически используем output traces для уменьшения размера образа
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

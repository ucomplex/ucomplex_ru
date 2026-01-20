#!/bin/bash

# Скрипт для коммита и деплоя с PDF файлами

echo "📦 Подготовка к деплою с PDF документами..."
echo ""

# Проверяем PDF файлы локально
echo "1️⃣ Проверяем локальные PDF файлы:"
if [ -d "public/ucdocs" ]; then
    ls -lh public/ucdocs/
    
    # Проверяем что это реальные PDF, а не LFS указатели
    for file in public/ucdocs/*.pdf; do
        if [ -f "$file" ]; then
            SIZE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            if [ "$SIZE" -lt 200 ]; then
                echo ""
                echo "⚠️  ВНИМАНИЕ: $file слишком маленький ($SIZE байт)"
                echo "Это LFS указатель! Выполните:"
                echo "  brew install git-lfs  # или apt-get install git-lfs"
                echo "  git lfs install"
                echo "  git lfs pull"
                exit 1
            fi
        fi
    done
    echo "✅ Все PDF файлы выглядят нормально"
else
    echo "❌ Папка public/ucdocs не найдена!"
    exit 1
fi
echo ""

# Показываем что будет закоммичено
echo "2️⃣ Файлы для коммита:"
git status --short
echo ""

# Добавляем все изменения
echo "3️⃣ Добавляем файлы в staging..."
git add .dockerignore cloudbuild.yaml Dockerfile \
  deploy-cloud-run.sh deploy-app-engine.sh deploy-gke.sh \
  setup-domain.sh kubernetes-deployment.yaml app.yaml .gcloudignore \
  fix-ucdocs.sh test-docker-build.sh check-cloudrun-status.sh \
  diagnose-all.sh commit-and-deploy.sh \
  DEPLOY.md DOMAIN-SETUP.md UCDOCS-FIX.md QUICK-DEPLOY.md \
  .gitignore

echo "✅ Файлы добавлены"
echo ""

# Коммитим
echo "4️⃣ Создаём коммит..."
git commit -m "Fix: Ensure PDF files are included in Docker build

- Simplify .dockerignore to prevent excluding public/ directory
- Add verification steps in Dockerfile for PDF files  
- Update cloudbuild.yaml to properly handle Git LFS files
- Add deployment scripts for Cloud Run, App Engine, and GKE
- Add comprehensive deployment and troubleshooting documentation"

echo "✅ Коммит создан"
echo ""

# Пушим
echo "5️⃣ Отправляем изменения на GitHub..."
git push origin main

echo ""
echo "=================================="
echo "✅ ДЕПЛОЙ ЗАПУЩЕН!"
echo ""
echo "Следующие шаги:"
echo ""
echo "1. Откройте Cloud Build для отслеживания сборки:"
echo "   https://console.cloud.google.com/cloud-build/builds"
echo ""
echo "2. Дождитесь статуса SUCCESS (5-10 минут)"
echo ""
echo "3. Откройте Cloud Run сервис:"
echo "   https://console.cloud.google.com/run"
echo ""
echo "4. Скопируйте URL сервиса и проверьте PDF:"
echo "   https://ваш-url.run.app/ucdocs/inn.pdf"
echo "   https://ваш-url.run.app/ucdocs/license.pdf"
echo "   https://ваш-url.run.app/ucdocs/ogrn.pdf"
echo "   https://ваш-url.run.app/ucdocs/ustav.pdf"
echo ""
echo "Если PDF открываются - всё работает! 🎉"
echo ""

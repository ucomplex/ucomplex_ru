#!/bin/bash

# Скрипт для деплоя на Google App Engine

set -e

echo "🚀 Начинаем деплой на App Engine..."

# Проверяем, установлен ли gcloud
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI не установлен. Установите его с https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Получаем PROJECT_ID
PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
    echo "❌ Проект GCP не настроен. Выполните: gcloud config set project ВАШ_PROJECT_ID"
    exit 1
fi

echo "📦 Проект: $PROJECT_ID"

# Включаем необходимые API
echo "🔧 Включаем необходимые API..."
gcloud services enable appengine.googleapis.com

# Собираем приложение
echo "🏗️  Собираем приложение..."
npm run build

# Деплоим на App Engine
echo "📤 Загружаем на App Engine..."
gcloud app deploy app.yaml --quiet

echo "✅ Деплой завершен!"
echo "🌐 Ваше приложение доступно по адресу:"
gcloud app browse --no-launch-browser

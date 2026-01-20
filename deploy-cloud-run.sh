#!/bin/bash

# Скрипт для деплоя на Google Cloud Run

set -e

echo "🚀 Начинаем деплой на Cloud Run..."

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
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Запускаем сборку
echo "🏗️  Запускаем Cloud Build..."
gcloud builds submit --config cloudbuild.yaml .

echo "✅ Деплой завершен!"
echo "🌐 Ваше приложение доступно по адресу:"
gcloud run services describe ucomplex-ru --region=us-central1 --format='value(status.url)'

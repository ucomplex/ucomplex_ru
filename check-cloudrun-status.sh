#!/bin/bash

# Скрипт для диагностики проблем с Cloud Run

set -e

echo "🔍 Диагностика Cloud Run сервиса"
echo "=================================="
echo ""

# Проверяем gcloud
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI не установлен"
    exit 1
fi

PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
if [ -z "$PROJECT_ID" ]; then
    echo "❌ Проект GCP не настроен"
    echo "Выполните: gcloud config set project ВАШ_PROJECT_ID"
    exit 1
fi

echo "📦 Проект: $PROJECT_ID"
echo ""

# Проверяем список сервисов
echo "1️⃣ Список Cloud Run сервисов:"
gcloud run services list --platform=managed 2>/dev/null || echo "❌ Нет доступных сервисов"
echo ""

# Проверяем статус конкретного сервиса
echo "2️⃣ Статус сервиса ucomplex-ru:"
if gcloud run services describe ucomplex-ru --region=us-central1 --format=yaml 2>/dev/null; then
    echo ""
    echo "✅ Сервис найден"
    
    # Получаем URL
    echo ""
    echo "3️⃣ URL сервиса:"
    URL=$(gcloud run services describe ucomplex-ru --region=us-central1 --format='value(status.url)' 2>/dev/null)
    echo "$URL"
    echo ""
    
    # Проверяем последнюю ревизию
    echo "4️⃣ Последняя ревизия:"
    REVISION=$(gcloud run services describe ucomplex-ru --region=us-central1 --format='value(status.latestCreatedRevisionName)' 2>/dev/null)
    echo "$REVISION"
    echo ""
    
    # Проверяем статус ревизии
    echo "5️⃣ Статус последней ревизии:"
    gcloud run revisions describe "$REVISION" --region=us-central1 --format='value(status.conditions)' 2>/dev/null || echo "Не удалось получить статус"
    echo ""
    
    # Проверяем доступность
    echo "6️⃣ Проверяем HTTP доступность:"
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL" --max-time 10)
    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ Сервис доступен (HTTP $HTTP_CODE)"
    else
        echo "❌ Сервис недоступен (HTTP $HTTP_CODE)"
    fi
    echo ""
    
    # Показываем последние логи
    echo "7️⃣ Последние логи сервиса:"
    gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=ucomplex-ru" \
        --limit=20 \
        --format='table(timestamp,severity,textPayload)' \
        2>/dev/null || echo "Не удалось получить логи"
    
else
    echo "❌ Сервис ucomplex-ru не найден в регионе us-central1"
    echo ""
    echo "Возможно сервис в другом регионе. Проверьте все регионы:"
    gcloud run services list --platform=managed
fi

echo ""
echo "=================================="

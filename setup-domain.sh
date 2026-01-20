#!/bin/bash

# Скрипт для привязки кастомного домена к Cloud Run

set -e

echo "🌐 Настройка кастомного домена для Cloud Run"

# Проверяем параметры
if [ "$#" -lt 1 ]; then
    echo "Использование: $0 <домен> [регион]"
    echo "Пример: $0 ucomplex.ru us-central1"
    exit 1
fi

DOMAIN=$1
REGION=${2:-us-central1}
SERVICE_NAME="ucomplex-ru"

# Проверяем, установлен ли gcloud
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI не установлен"
    exit 1
fi

PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
    echo "❌ Проект GCP не настроен"
    exit 1
fi

echo "📦 Проект: $PROJECT_ID"
echo "🌍 Домен: $DOMAIN"
echo "📍 Регион: $REGION"
echo ""

# Проверяем, существует ли сервис
echo "🔍 Проверяем сервис Cloud Run..."
if ! gcloud run services describe $SERVICE_NAME --region=$REGION &>/dev/null; then
    echo "❌ Сервис $SERVICE_NAME не найден в регионе $REGION"
    echo "Доступные сервисы:"
    gcloud run services list
    exit 1
fi

echo "✅ Сервис найден"

# Создаем маппинг домена
echo ""
echo "🔗 Создаем маппинг домена..."
gcloud run domain-mappings create \
    --service=$SERVICE_NAME \
    --domain=$DOMAIN \
    --region=$REGION

echo ""
echo "✅ Маппинг создан!"
echo ""
echo "📋 Теперь добавьте следующие DNS записи у вашего регистратора домена:"
echo ""

# Получаем информацию о DNS записях
gcloud run domain-mappings describe $DOMAIN --region=$REGION --format=json | \
    python3 -c "
import sys, json
data = json.load(sys.stdin)
records = data.get('status', {}).get('resourceRecords', [])
print('DNS записи, которые нужно добавить:')
print('=' * 60)
for record in records:
    rtype = record.get('type', '')
    name = record.get('name', '')
    rrdata = record.get('rrdata', '')
    print(f'Тип: {rtype}')
    print(f'Имя: {name}')
    print(f'Значение: {rrdata}')
    print('-' * 60)
" 2>/dev/null || echo "Используйте команду ниже для получения DNS записей:"

echo ""
echo "📝 Для просмотра DNS записей выполните:"
echo "gcloud run domain-mappings describe $DOMAIN --region=$REGION"
echo ""
echo "⏳ После добавления DNS записей, подождите 15-60 минут для распространения изменений"
echo ""
echo "🔒 SSL сертификат будет автоматически выпущен после верификации домена"

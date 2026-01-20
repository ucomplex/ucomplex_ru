#!/bin/bash

# Полная диагностика состояния деплоя

echo "🔍 ПОЛНАЯ ДИАГНОСТИКА CLOUD RUN"
echo "=================================="
date
echo ""

# 1. Проверка gcloud
echo "1️⃣ Проверка gcloud CLI:"
if command -v gcloud &> /dev/null; then
    echo "✅ gcloud установлен: $(gcloud version | head -1)"
    PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
    echo "📦 Проект: ${PROJECT_ID:-'НЕ НАСТРОЕН'}"
    ACCOUNT=$(gcloud config get-value account 2>/dev/null)
    echo "👤 Аккаунт: ${ACCOUNT:-'НЕ АВТОРИЗОВАН'}"
else
    echo "❌ gcloud не установлен"
    exit 1
fi
echo ""

# 2. Список сервисов
echo "2️⃣ Список Cloud Run сервисов:"
gcloud run services list --platform=managed 2>&1
echo ""

# 3. Статус ucomplex-ru
echo "3️⃣ Поиск сервиса ucomplex-ru во всех регионах:"
for region in us-central1 us-east1 europe-west1 asia-northeast1; do
    echo "  Регион: $region"
    if gcloud run services describe ucomplex-ru --region=$region 2>/dev/null | grep -q "name:"; then
        echo "  ✅ НАЙДЕН в $region!"
        
        URL=$(gcloud run services describe ucomplex-ru --region=$region --format='value(status.url)' 2>/dev/null)
        echo "  🌐 URL: $URL"
        
        STATUS=$(gcloud run services describe ucomplex-ru --region=$region --format='value(status.conditions[0].status)' 2>/dev/null)
        echo "  📊 Статус: $STATUS"
        
        TRAFFIC=$(gcloud run services describe ucomplex-ru --region=$region --format='value(status.traffic[0].percent)' 2>/dev/null)
        echo "  🚦 Трафик: ${TRAFFIC}%"
        
        # Проверяем HTTP доступность
        echo -n "  🔗 HTTP проверка: "
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL" --max-time 10 2>/dev/null)
        if [ "$HTTP_CODE" = "200" ]; then
            echo "✅ OK (HTTP $HTTP_CODE)"
        else
            echo "❌ Ошибка (HTTP $HTTP_CODE)"
        fi
        
        # Проверяем PDF файлы
        echo "  📄 Проверка PDF файлов:"
        for pdf in inn.pdf license.pdf ogrn.pdf ustav.pdf; do
            echo -n "     $pdf: "
            PDF_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL/ucdocs/$pdf" --max-time 10 2>/dev/null)
            if [ "$PDF_CODE" = "200" ]; then
                SIZE=$(curl -sI "$URL/ucdocs/$pdf" --max-time 10 2>/dev/null | grep -i content-length | awk '{print $2}' | tr -d '\r')
                echo "✅ ($PDF_CODE, ${SIZE:-unknown} bytes)"
            else
                echo "❌ ($PDF_CODE)"
            fi
        done
        
        echo ""
        break
    fi
done
echo ""

# 4. Последние сборки
echo "4️⃣ Последние 5 сборок Cloud Build:"
gcloud builds list --limit=5 --format='table(id,status,createTime,duration)' 2>&1
echo ""

# 5. Последние логи
echo "5️⃣ Последние логи Cloud Run (ошибки):"
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=ucomplex-ru AND severity>=WARNING" \
    --limit=10 \
    --format='table(timestamp,severity,textPayload)' \
    2>&1 || echo "Нет логов или ошибка доступа"
echo ""

# 6. Информация о последней сборке
echo "6️⃣ Последняя сборка (детали):"
LAST_BUILD=$(gcloud builds list --limit=1 --format='value(id)' 2>/dev/null)
if [ -n "$LAST_BUILD" ]; then
    echo "Build ID: $LAST_BUILD"
    gcloud builds describe "$LAST_BUILD" --format='value(status,createTime,finishTime)' 2>&1
    echo ""
    echo "Логи последней сборки (последние 30 строк):"
    gcloud builds log "$LAST_BUILD" 2>&1 | tail -30
else
    echo "Сборок не найдено"
fi
echo ""

echo "=================================="
echo "✅ Диагностика завершена"
echo ""
echo "Следующие шаги:"
echo "1. Если сервис не найден - запустите ./deploy-cloud-run.sh"
echo "2. Если сервис есть, но не отвечает - проверьте логи выше"
echo "3. Если PDF не доступны - убедитесь что изменения запушены в Git"

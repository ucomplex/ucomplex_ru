#!/bin/bash

# Скрипт для локальной проверки Docker сборки с PDF файлами

set -e

echo "🧪 Тестируем Docker сборку..."
echo ""

# Проверяем локальные файлы
echo "1️⃣ Проверяем локальные PDF файлы:"
ls -lh public/ucdocs/
echo ""

# Собираем Docker образ
echo "2️⃣ Собираем Docker образ..."
docker build -t ucomplex-test . 2>&1 | grep -E "(Step|pdf|ucdocs|Проверяем)" || true
echo ""

# Проверяем что файлы попали в образ
echo "3️⃣ Проверяем файлы внутри Docker образа..."
docker run --rm ucomplex-test ls -lh public/ucdocs/ || echo "❌ Файлы не найдены!"
echo ""

# Запускаем контейнер
echo "4️⃣ Запускаем контейнер на порту 8080..."
docker run -d --name ucomplex-test-run -p 8080:8080 ucomplex-test
echo "✅ Контейнер запущен"
echo ""

# Ждем запуска
echo "⏳ Ждем 5 секунд для запуска приложения..."
sleep 5

# Проверяем доступность PDF
echo "5️⃣ Проверяем доступность PDF файлов через HTTP:"
for file in inn.pdf license.pdf ogrn.pdf ustav.pdf; do
    echo -n "  $file: "
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/ucdocs/$file)
    SIZE=$(curl -s -I http://localhost:8080/ucdocs/$file | grep -i content-length | awk '{print $2}' | tr -d '\r')
    if [ "$STATUS" = "200" ]; then
        echo "✅ OK (Status: $STATUS, Size: $SIZE bytes)"
    else
        echo "❌ FAILED (Status: $STATUS)"
    fi
done
echo ""

# Останавливаем контейнер
echo "6️⃣ Останавливаем тестовый контейнер..."
docker stop ucomplex-test-run
docker rm ucomplex-test-run

echo ""
echo "=============================================="
echo "✅ Тест завершен!"
echo ""
echo "Если все PDF файлы доступны (Status: 200), то:"
echo "  git add ."
echo "  git commit -m 'Fix: Update .dockerignore to include PDF files'"
echo "  git push"
echo ""
echo "Для очистки:"
echo "  docker rmi ucomplex-test"

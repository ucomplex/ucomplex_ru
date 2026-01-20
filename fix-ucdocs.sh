#!/bin/bash

# Скрипт для проверки и исправления проблемы с PDF файлами

set -e

echo "🔍 Диагностика проблемы с ucdocs PDF файлами"
echo "=============================================="
echo ""

# Проверка 1: Есть ли файлы локально?
echo "1️⃣ Проверяем локальные файлы..."
if [ -d "public/ucdocs" ]; then
    echo "✅ Папка public/ucdocs существует"
    echo "📄 Файлы в папке:"
    ls -lh public/ucdocs/
    echo ""
    
    # Проверяем, являются ли это LFS указатели
    for file in public/ucdocs/*.pdf; do
        if [ -f "$file" ]; then
            SIZE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            if [ "$SIZE" -lt 200 ]; then
                echo "⚠️  $file слишком маленький ($SIZE байт) - возможно это LFS указатель!"
                echo "   Содержимое файла:"
                head -n 5 "$file"
            else
                echo "✅ $file выглядит нормально ($SIZE байт)"
            fi
        fi
    done
else
    echo "❌ Папка public/ucdocs не найдена!"
fi
echo ""

# Проверка 2: Настроен ли Git LFS?
echo "2️⃣ Проверяем Git LFS..."
if command -v git-lfs &> /dev/null; then
    echo "✅ Git LFS установлен"
    git lfs version
    echo ""
    echo "📋 LFS файлы в репозитории:"
    git lfs ls-files | head -n 10
else
    echo "❌ Git LFS не установлен!"
    echo "   Установите: https://git-lfs.github.com/"
fi
echo ""

# Проверка 3: .gitattributes настроен?
echo "3️⃣ Проверяем .gitattributes..."
if [ -f ".gitattributes" ]; then
    echo "✅ .gitattributes существует:"
    cat .gitattributes
else
    echo "❌ .gitattributes не найден!"
fi
echo ""

# Проверка 4: .dockerignore
echo "4️⃣ Проверяем .dockerignore..."
if grep -q "public" .dockerignore; then
    echo "⚠️  В .dockerignore есть упоминание public:"
    grep "public" .dockerignore
else
    echo "✅ public не игнорируется в .dockerignore"
fi
echo ""

echo "=============================================="
echo "🔧 РЕШЕНИЕ ПРОБЛЕМЫ:"
echo ""
echo "Если файлы являются LFS указателями, выполните:"
echo ""
echo "  # Установите Git LFS (если не установлен)"
echo "  brew install git-lfs  # macOS"
echo "  # или"
echo "  sudo apt-get install git-lfs  # Linux"
echo ""
echo "  # Инициализируйте LFS и скачайте файлы"
echo "  git lfs install"
echo "  git lfs pull"
echo ""
echo "  # Проверьте что файлы скачались"
echo "  ls -lh public/ucdocs/"
echo ""
echo "  # Закоммитьте изменения"
echo "  git add ."
echo "  git commit -m 'Fix: Ensure PDF files are properly tracked'"
echo "  git push"
echo ""
echo "После этого Cloud Build автоматически пересоберет приложение"
echo "с правильными PDF файлами."
echo ""

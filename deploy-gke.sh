#!/bin/bash

# Скрипт для деплоя на Google Kubernetes Engine (GKE)

set -e

echo "🚀 Начинаем деплой на GKE..."

# Проверяем, установлен ли gcloud
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI не установлен. Установите его с https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Проверяем, установлен ли kubectl
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl не установлен. Установите его с https://kubernetes.io/docs/tasks/tools/"
    exit 1
fi

# Получаем PROJECT_ID
PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
    echo "❌ Проект GCP не настроен. Выполните: gcloud config set project ВАШ_PROJECT_ID"
    exit 1
fi

CLUSTER_NAME="ucomplex-cluster"
REGION="us-central1"
IMAGE_NAME="gcr.io/$PROJECT_ID/ucomplex-ru:latest"

echo "📦 Проект: $PROJECT_ID"

# Включаем необходимые API
echo "🔧 Включаем необходимые API..."
gcloud services enable container.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Собираем и пушим Docker образ
echo "🏗️  Собираем Docker образ..."
docker build -t $IMAGE_NAME .

echo "📤 Загружаем образ в Container Registry..."
docker push $IMAGE_NAME

# Проверяем, существует ли кластер
CLUSTER_EXISTS=$(gcloud container clusters list --filter="name=$CLUSTER_NAME" --format="value(name)" || echo "")

if [ -z "$CLUSTER_EXISTS" ]; then
    echo "🆕 Создаем новый GKE кластер..."
    gcloud container clusters create $CLUSTER_NAME \
        --region=$REGION \
        --num-nodes=3 \
        --machine-type=e2-medium \
        --enable-autoscaling \
        --min-nodes=1 \
        --max-nodes=5
else
    echo "✅ Кластер уже существует"
fi

# Получаем учетные данные кластера
echo "🔐 Получаем учетные данные кластера..."
gcloud container clusters get-credentials $CLUSTER_NAME --region=$REGION

# Обновляем манифест с правильным PROJECT_ID
sed "s/YOUR_PROJECT_ID/$PROJECT_ID/g" kubernetes-deployment.yaml > kubernetes-deployment-final.yaml

# Применяем манифест
echo "🚢 Деплоим на Kubernetes..."
kubectl apply -f kubernetes-deployment-final.yaml

# Ждем, пока Service получит внешний IP
echo "⏳ Ожидаем получения внешнего IP адреса..."
kubectl wait --for=condition=available --timeout=300s deployment/ucomplex-ru

echo "✅ Деплой завершен!"
echo "🌐 Получите IP адрес вашего приложения:"
kubectl get service ucomplex-ru-service

# Удаляем временный файл
rm kubernetes-deployment-final.yaml

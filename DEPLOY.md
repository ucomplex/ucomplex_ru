# Руководство по деплоу в Google Cloud

Этот проект можно развернуть в Google Cloud несколькими способами. Выберите подходящий вариант в зависимости от ваших потребностей.

## 📋 Предварительные требования

1. **Google Cloud аккаунт** - [Создать бесплатно](https://cloud.google.com/free)
2. **Google Cloud SDK (gcloud CLI)** - [Установить](https://cloud.google.com/sdk/docs/install)
3. **Docker** (для локальной сборки) - [Установить](https://docs.docker.com/get-docker/)

### Первоначальная настройка

```bash
# Войдите в Google Cloud
gcloud auth login

# Создайте новый проект или используйте существующий
gcloud projects create ВАШ_PROJECT_ID --name="UComplex"

# Установите проект по умолчанию
gcloud config set project ВАШ_PROJECT_ID

# Включите биллинг для проекта (обязательно)
# Это можно сделать в консоли: https://console.cloud.google.com/billing
```

---

## 🚀 Вариант 1: Cloud Run (Рекомендуется) ⭐

**Лучший выбор для**: большинства случаев, автоматическое масштабирование, оплата только за использование.

### Преимущества:
- ✅ Автоматическое масштабирование от 0 до множества инстансов
- ✅ Оплата только за фактическое использование (pay-per-use)
- ✅ SSL сертификаты включены автоматически
- ✅ Легкая настройка кастомных доменов
- ✅ Простота использования

### Быстрый деплой:

```bash
./deploy-cloud-run.sh
```

### Ручной деплой:

```bash
# 1. Включите необходимые API
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# 2. Соберите и задеплойте приложение
gcloud builds submit --config cloudbuild.yaml .

# 3. Получите URL вашего приложения
gcloud run services describe ucomplex-ru --region=us-central1 --format='value(status.url)'
```

### Настройка автоматического деплоя из GitHub:

```bash
# Создайте триггер Cloud Build
gcloud builds triggers create github \
  --repo-name=ucomplex.ru \
  --repo-owner=ВАШ_GITHUB_USERNAME \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml
```

После этого каждый push в main ветку будет автоматически деплоить новую версию.

### Настройка кастомного домена:

```bash
# 1. Создайте маппинг домена
gcloud run domain-mappings create --service=ucomplex-ru --domain=ucomplex.ru --region=us-central1

# 2. Добавьте DNS записи (будут показаны в выводе команды выше)
```

### Стоимость:
- **Бесплатный уровень**: 2 млн запросов/месяц
- После бесплатного: ~$0.40 за 1 млн запросов
- Подробнее: https://cloud.google.com/run/pricing

---

## 🏢 Вариант 2: App Engine

**Лучший выбор для**: простых приложений, если вам нужна более традиционная PaaS модель.

### Преимущества:
- ✅ Простота настройки
- ✅ Автоматическое масштабирование
- ✅ Встроенный кеширование статики
- ✅ Интеграция с другими Google сервисами

### Быстрый деплой:

```bash
./deploy-app-engine.sh
```

### Ручной деплой:

```bash
# 1. Включите App Engine API
gcloud services enable appengine.googleapis.com

# 2. Создайте приложение App Engine (только первый раз)
gcloud app create --region=us-central

# 3. Соберите проект
npm run build

# 4. Задеплойте
gcloud app deploy app.yaml --quiet

# 5. Откройте приложение в браузере
gcloud app browse
```

### Управление версиями:

```bash
# Посмотреть все версии
gcloud app versions list

# Переключить трафик на другую версию
gcloud app services set-traffic default --splits=VERSION_ID=1

# Удалить старую версию
gcloud app versions delete VERSION_ID
```

### Стоимость:
- **Бесплатный уровень**: 28 часов F1 инстанса/день
- После бесплатного: от $0.05/час за F1 инстанс
- Подробнее: https://cloud.google.com/appengine/pricing

---

## ⚙️ Вариант 3: Google Kubernetes Engine (GKE)

**Лучший выбор для**: сложных приложений с микросервисами, требующих полного контроля над оркестрацией.

### Преимущества:
- ✅ Полный контроль над инфраструктурой
- ✅ Поддержка сложных сценариев развертывания
- ✅ Blue-Green и Canary деплойменты
- ✅ Интеграция с Istio, Prometheus и др.

### Быстрый деплой:

```bash
./deploy-gke.sh
```

### Ручной деплой:

```bash
# 1. Включите Kubernetes Engine API
gcloud services enable container.googleapis.com

# 2. Создайте кластер
gcloud container clusters create ucomplex-cluster \
  --region=us-central1 \
  --num-nodes=3 \
  --machine-type=e2-medium \
  --enable-autoscaling \
  --min-nodes=1 \
  --max-nodes=5

# 3. Получите учетные данные
gcloud container clusters get-credentials ucomplex-cluster --region=us-central1

# 4. Соберите и загрузите образ
PROJECT_ID=$(gcloud config get-value project)
docker build -t gcr.io/$PROJECT_ID/ucomplex-ru:latest .
docker push gcr.io/$PROJECT_ID/ucomplex-ru:latest

# 5. Обновите kubernetes-deployment.yaml (замените YOUR_PROJECT_ID)
# 6. Примените манифест
kubectl apply -f kubernetes-deployment.yaml

# 7. Получите внешний IP
kubectl get service ucomplex-ru-service
```

### Управление:

```bash
# Посмотреть поды
kubectl get pods

# Посмотреть логи
kubectl logs -l app=ucomplex-ru

# Масштабировать вручную
kubectl scale deployment ucomplex-ru --replicas=5

# Обновить образ
kubectl set image deployment/ucomplex-ru ucomplex-ru=gcr.io/$PROJECT_ID/ucomplex-ru:new-tag
```

### Стоимость:
- **Управление кластером**: $0.10/час (обязательно)
- **Ноды**: зависит от типа машин (e2-medium ~$25/месяц за ноду)
- Подробнее: https://cloud.google.com/kubernetes-engine/pricing

---

## 📊 Сравнение вариантов

| Критерий | Cloud Run | App Engine | GKE |
|----------|-----------|------------|-----|
| **Простота** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Гибкость** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Стоимость (малая нагрузка)** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Масштабирование** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Контроль** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |

## 🔧 Локальное тестирование

Перед деплоем протестируйте Docker образ локально:

```bash
# Соберите образ
docker build -t ucomplex-ru .

# Запустите контейнер
docker run -p 8080:8080 ucomplex-ru

# Откройте в браузере
open http://localhost:8080
```

## 🌐 Настройка кастомного домена

### Для Cloud Run:
```bash
gcloud run domain-mappings create \
  --service=ucomplex-ru \
  --domain=ucomplex.ru \
  --region=us-central1
```

### Для App Engine:
```bash
gcloud app domain-mappings create ucomplex.ru
```

### DNS настройки:
После создания маппинга, добавьте в вашем DNS провайдере:
- **A запись**: IP адрес, предоставленный Google
- **AAAA запись**: IPv6 адрес (опционально)

## 📝 Переменные окружения

Для добавления переменных окружения:

### Cloud Run:
```bash
gcloud run services update ucomplex-ru \
  --update-env-vars KEY1=VALUE1,KEY2=VALUE2 \
  --region=us-central1
```

### App Engine:
Добавьте в `app.yaml`:
```yaml
env_variables:
  KEY1: 'VALUE1'
  KEY2: 'VALUE2'
```

### GKE:
Обновите `kubernetes-deployment.yaml`:
```yaml
env:
- name: KEY1
  value: "VALUE1"
```

## 🔍 Мониторинг и логи

### Cloud Run:
```bash
# Просмотр логов
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=ucomplex-ru" --limit 50

# Метрики в консоли
https://console.cloud.google.com/run
```

### App Engine:
```bash
# Просмотр логов
gcloud app logs tail -s default

# Метрики в консоли
https://console.cloud.google.com/appengine
```

### GKE:
```bash
# Просмотр логов
kubectl logs -l app=ucomplex-ru --tail=100

# Использовать Cloud Logging
https://console.cloud.google.com/logs/query
```

## 🚨 Откат версии

### Cloud Run:
```bash
# Список ревизий
gcloud run revisions list --service=ucomplex-ru --region=us-central1

# Переключить весь трафик на старую ревизию
gcloud run services update-traffic ucomplex-ru \
  --to-revisions=REVISION_NAME=100 \
  --region=us-central1
```

### App Engine:
```bash
# Список версий
gcloud app versions list

# Переключить трафик
gcloud app services set-traffic default --splits=OLD_VERSION=1
```

### GKE:
```bash
# Откат деплоймента
kubectl rollout undo deployment/ucomplex-ru

# Откат к конкретной ревизии
kubectl rollout undo deployment/ucomplex-ru --to-revision=2
```

## 💰 Оптимизация стоимости

1. **Cloud Run**: Используйте минимальные инстансы (min-instances=0) для dev окружения
2. **App Engine**: Используйте automatic scaling с разумными лимитами
3. **GKE**: Используйте Spot VM для dev окружения, включите cluster autoscaling

## 🛡️ Безопасность

```bash
# Для Cloud Run - ограничить доступ только с определенных IP
gcloud run services update ucomplex-ru \
  --ingress=internal-and-cloud-load-balancing \
  --region=us-central1

# Добавить IAM политики
gcloud run services add-iam-policy-binding ucomplex-ru \
  --member='user:email@example.com' \
  --role='roles/run.invoker' \
  --region=us-central1
```

## 📚 Полезные ссылки

- [Cloud Run документация](https://cloud.google.com/run/docs)
- [App Engine документация](https://cloud.google.com/appengine/docs)
- [GKE документация](https://cloud.google.com/kubernetes-engine/docs)
- [Google Cloud Free Tier](https://cloud.google.com/free)
- [Google Cloud Console](https://console.cloud.google.com)

## ❓ Помощь и поддержка

Если возникли проблемы:

1. Проверьте логи (см. раздел Мониторинг)
2. Убедитесь, что все необходимые API включены
3. Проверьте квоты проекта: https://console.cloud.google.com/iam-admin/quotas
4. Обратитесь к документации Google Cloud

---

**Рекомендация**: Для начала используйте **Cloud Run** - он самый простой в настройке и самый дешевый для малых нагрузок.

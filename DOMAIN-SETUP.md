# 🌐 Настройка кастомного домена

Пошаговая инструкция по привязке домена **ucomplex.ru** к вашему приложению в Google Cloud.

---

## Вариант 1: Cloud Run (Рекомендуется)

### Шаг 1: Создайте маппинг домена

```bash
# Быстрый способ с помощью скрипта
chmod +x setup-domain.sh
./setup-domain.sh ucomplex.ru

# Или вручную
gcloud run domain-mappings create \
  --service=ucomplex-ru \
  --domain=ucomplex.ru \
  --region=us-central1
```

### Шаг 2: Получите DNS записи

После создания маппинга вы получите DNS записи, которые нужно добавить:

```bash
gcloud run domain-mappings describe ucomplex.ru --region=us-central1
```

Вывод будет примерно таким:

```yaml
status:
  resourceRecords:
  - name: ucomplex.ru
    rrdata: ghs.googlehosted.com.
    type: A
  - name: ucomplex.ru
    rrdata: 2001:4860:4802:32::15
    type: AAAA
```

### Шаг 3: Добавьте DNS записи у регистратора

Зайдите в панель управления вашего регистратора домена (например, Reg.ru, Cloudflare, GoDaddy) и добавьте:

#### Для корневого домена (ucomplex.ru):

| Тип | Имя | Значение | TTL |
|-----|-----|----------|-----|
| A | @ | `IP-адрес из вывода` | 3600 |
| AAAA | @ | `IPv6-адрес из вывода` | 3600 |

#### Для поддомена www (опционально):

```bash
# Создайте маппинг для www
gcloud run domain-mappings create \
  --service=ucomplex-ru \
  --domain=www.ucomplex.ru \
  --region=us-central1
```

Затем добавьте:

| Тип | Имя | Значение | TTL |
|-----|-----|----------|-----|
| CNAME | www | ucomplex.ru | 3600 |

### Шаг 4: Дождитесь распространения DNS

```bash
# Проверьте DNS записи (может занять от 15 минут до 24 часов)
dig ucomplex.ru
dig www.ucomplex.ru

# Или используйте онлайн-инструмент
# https://dnschecker.org/
```

### Шаг 5: Проверьте статус

```bash
# Проверьте статус маппинга
gcloud run domain-mappings describe ucomplex.ru --region=us-central1

# Статус должен стать "ACTIVE"
```

### Шаг 6: SSL сертификат (автоматически)

Google автоматически выпустит и установит SSL сертификат. Это может занять до 24 часов после верификации DNS.

```bash
# Проверьте статус сертификата
gcloud run domain-mappings describe ucomplex.ru --region=us-central1 \
  --format='value(status.conditions)'
```

---

## Вариант 2: App Engine

### Шаг 1: Верифицируйте владение доменом

```bash
# Откройте Search Console для верификации
gcloud app domain-mappings create ucomplex.ru
```

Следуйте инструкциям в выводе команды для верификации через Google Search Console.

### Шаг 2: Добавьте DNS записи

```bash
# Получите DNS записи
gcloud app domain-mappings describe ucomplex.ru
```

Добавьте записи у вашего регистратора:

| Тип | Имя | Значение |
|-----|-----|----------|
| A | @ | 216.239.32.21 |
| A | @ | 216.239.34.21 |
| A | @ | 216.239.36.21 |
| A | @ | 216.239.38.21 |
| AAAA | @ | 2001:4860:4802:32::15 |
| AAAA | @ | 2001:4860:4802:34::15 |
| AAAA | @ | 2001:4860:4802:36::15 |
| AAAA | @ | 2001:4860:4802:38::15 |

### Шаг 3: SSL сертификат

```bash
# Включите управляемый SSL сертификат
gcloud app ssl-certificates create \
  --display-name=ucomplex-ssl \
  --domains=ucomplex.ru,www.ucomplex.ru \
  --automatic
```

---

## Вариант 3: GKE с Load Balancer

### Шаг 1: Получите внешний IP Load Balancer

```bash
# Получите IP адрес вашего сервиса
kubectl get service ucomplex-ru-service

# Или создайте статический IP
gcloud compute addresses create ucomplex-ip --global

# Получите созданный IP
gcloud compute addresses describe ucomplex-ip --global
```

### Шаг 2: Настройте Ingress с SSL

```bash
# Создайте файл ingress.yaml
cat > ingress.yaml <<EOF
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ucomplex-ingress
  annotations:
    kubernetes.io/ingress.global-static-ip-name: "ucomplex-ip"
    networking.gke.io/managed-certificates: "ucomplex-cert"
    kubernetes.io/ingress.class: "gce"
spec:
  rules:
  - host: ucomplex.ru
    http:
      paths:
      - path: /*
        pathType: ImplementationSpecific
        backend:
          service:
            name: ucomplex-ru-service
            port:
              number: 80
---
apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: ucomplex-cert
spec:
  domains:
    - ucomplex.ru
    - www.ucomplex.ru
EOF

# Примените конфигурацию
kubectl apply -f ingress.yaml
```

### Шаг 3: Добавьте DNS записи

| Тип | Имя | Значение |
|-----|-----|----------|
| A | @ | `IP из статического адреса` |
| CNAME | www | ucomplex.ru |

### Шаг 4: Проверьте статус сертификата

```bash
kubectl describe managedcertificate ucomplex-cert
```

---

## 🔍 Проверка и отладка

### Проверьте DNS пропагацию

```bash
# Используйте dig
dig +short ucomplex.ru
dig +short www.ucomplex.ru

# Или nslookup
nslookup ucomplex.ru
nslookup www.ucomplex.ru

# Проверьте из разных локаций
# https://www.whatsmydns.net/
```

### Проверьте SSL сертификат

```bash
# Используйте openssl
openssl s_client -connect ucomplex.ru:443 -servername ucomplex.ru

# Или проверьте онлайн
# https://www.ssllabs.com/ssltest/
```

### Проверьте маппинг домена (Cloud Run)

```bash
# Список всех маппингов
gcloud run domain-mappings list --region=us-central1

# Детали конкретного маппинга
gcloud run domain-mappings describe ucomplex.ru --region=us-central1

# Логи
gcloud logging read "resource.type=cloud_run_revision" --limit=50
```

---

## 🚨 Возможные проблемы и решения

### Проблема: DNS не обновляется

**Решение:**
- Подождите 24-48 часов для полной пропагации
- Очистите DNS кеш: `sudo dscacheutil -flushcache` (macOS)
- Проверьте TTL записей (уменьшите до 300 для быстрого обновления)

### Проблема: SSL сертификат не выпускается

**Решение:**
```bash
# Убедитесь, что DNS записи правильные
dig ucomplex.ru

# Проверьте статус сертификата
gcloud run domain-mappings describe ucomplex.ru --region=us-central1

# Удалите и создайте маппинг заново
gcloud run domain-mappings delete ucomplex.ru --region=us-central1
gcloud run domain-mappings create --service=ucomplex-ru --domain=ucomplex.ru --region=us-central1
```

### Проблема: Ошибка "Domain ownership not verified"

**Решение:**
```bash
# Верифицируйте домен через Search Console
# https://search.google.com/search-console/welcome

# Или добавьте TXT запись для верификации
```

### Проблема: CORS ошибки после привязки домена

**Решение:** Обновите `next.config.mjs`:
```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://ucomplex.ru' },
        ],
      },
    ]
  },
}
```

---

## 🔄 Редирект с www на корневой домен (или наоборот)

### Cloud Run

```bash
# Создайте оба маппинга
gcloud run domain-mappings create --service=ucomplex-ru --domain=ucomplex.ru --region=us-central1
gcloud run domain-mappings create --service=ucomplex-ru --domain=www.ucomplex.ru --region=us-central1
```

Затем настройте редирект в `next.config.mjs`:

```javascript
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.ucomplex.ru',
          },
        ],
        destination: 'https://ucomplex.ru/:path*',
        permanent: true,
      },
    ]
  },
}
```

### Cloudflare (если используете)

Если домен проксируется через Cloudflare, добавьте Page Rule:
- URL: `www.ucomplex.ru/*`
- Setting: Forwarding URL (301)
- Destination: `https://ucomplex.ru/$1`

---

## 📊 Полезные команды

```bash
# Список всех доменов (Cloud Run)
gcloud run domain-mappings list --region=us-central1

# Удалить маппинг
gcloud run domain-mappings delete ucomplex.ru --region=us-central1

# Проверить доступность домена
curl -I https://ucomplex.ru

# Проверить редирект
curl -I https://www.ucomplex.ru

# Мониторинг DNS
watch -n 5 'dig +short ucomplex.ru'
```

---

## 💡 Рекомендации

1. **Всегда используйте HTTPS** - Google Cloud автоматически выпускает бесплатные SSL сертификаты
2. **Настройте редирект** - Выберите основной вариант (с www или без) и настройте редирект
3. **Используйте CDN** - Cloud Run уже включает глобальный CDN
4. **Мониторьте сертификаты** - Они обновляются автоматически, но следите за статусом
5. **Настройте DNS у надежного провайдера** - Cloudflare, Google Cloud DNS предпочтительнее

---

## 📱 Проверка после настройки

После успешной настройки проверьте:

- [ ] Домен открывается по HTTPS
- [ ] SSL сертификат валидный
- [ ] Редирект с www работает (если настроен)
- [ ] Все страницы доступны
- [ ] Статические файлы загружаются
- [ ] Нет CORS ошибок

```bash
# Быстрая проверка
curl -I https://ucomplex.ru
curl -I https://www.ucomplex.ru
curl https://ucomplex.ru
```

---

## 🆘 Нужна помощь?

- [Cloud Run Custom Domains](https://cloud.google.com/run/docs/mapping-custom-domains)
- [App Engine Custom Domains](https://cloud.google.com/appengine/docs/standard/mapping-custom-domains)
- [GKE Ingress](https://cloud.google.com/kubernetes-engine/docs/concepts/ingress)
- [Google Domains Help](https://support.google.com/domains)

# Amaya Kids — paywall

Мобильный paywall для детской игры (webview). Nuxt 4 + TypeScript, frontend и backend в одном проекте, тестовые покупки сохраняются в SQLite.

## Макет
https://www.figma.com/design/NQTsVCKb6Son2prj5yfZ6h/Untitled?node-id=1-5&t=4iiSO8ZXYv3mqw1M-1

## Запуск

```bash
npm install
npm run dev          # http://localhost:3000
```

Продакшен:

```bash
npm run build
node .output/server/index.mjs
```

При старте сервера (Nitro-плагин `server/plugins/db.ts`) создаётся папка `data/` и файл БД `data/store.db`, если их ещё нет. Затем применяются схема и сид тарифов.

## Деплой

- Нужен Node-сервер (VPS, Docker, Render, Railway, Fly.io и т. п.). Serverless-платформы с эфемерной файловой системой не подходят.
- Процесс запускается из корня проекта: путь к БД — `${process.cwd()}/data/store.db`.
- Папку `data/` нужно смонтировать на постоянный диск (volume), иначе покупки пропадут при редеплое.
- `better-sqlite3` — нативный модуль. Сборку нужно выполнять на той же ОС и архитектуре, где он будет работать (например, внутри Docker-образа).

## API

| Метод | URL | Тело | Ответ |
|---|---|---|---|
| GET | `/api/offers` | — | `{ offers: Offer[] }` |
| POST | `/api/purchase` | `{ offerId, deviceId }` | `{ purchase: Purchase }` |
| POST | `/api/restore` | `{ deviceId }` | `{ purchase: Purchase \| null }` |

Ошибки возвращаются в едином формате h3: `statusCode`, `statusMessage`, `data.code` (`VALIDATION_ERROR`, `OFFER_NOT_FOUND`). Типы описаны в `shared/types/paywall.ts`.

## Структура

```
server/
  db/db.ts            подключение к SQLite (getDb)
  db/schema.ts        SQL-схема и сид, initSchema(db)
  plugins/db.ts       создание data/ и БД при старте
  repositories/       работа с БД, первым параметром принимают соединение db
  services/           бизнес-логика, вызываются из server/api
  utils/              apiError(), валидация тел запросов
  api/                тонкие route-хендлеры
app/
  utils/api.ts        единая точка запросов: нормализация ошибок в ApiError + toast
  composables/        useNotify (всплывающие уведомления), useDeviceId
  plugins/            device-id.client (id устройства в localStorage), error-handler.client
  stores/paywall.ts   Pinia-store экрана
  components/         AppToaster, paywall/*
  assets/scss/        reset, шрифты, токены, миксины, базовые стили
  assets/fonts/       Nunito (SIL OFL 1.1)
```

Репозитории не зависят от глобального соединения, поэтому их можно тестировать на `new Database(':memory:')` после `initSchema(db)`.
